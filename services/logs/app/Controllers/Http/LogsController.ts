import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LogsModel from 'App/Models/Logs';
import DiscordWebhooksModel from 'App/Models/DiscordWebhooks';
import { WebhookClient } from 'discord.js';

export default class LogsController {
	constructor() {
		this.sendMessage = this.sendMessage.bind(this);
		this.sendMessage();
	}

	private messageQueue: { url: string; message: string }[] = [];

	private isSending: boolean = false;

	public async index({ response, request }: HttpContextContract) {
		try {
			const {
				sort = {},
				filter = {},
				pageSize = 10,
				page = 1,
			} = await request.all();
			const logs = await LogsModel.find(filter)
				.sort(sort)
				.skip((page - 1) * pageSize)
				.limit(pageSize);
			const totalRows = await LogsModel.count(filter);
			const actions = await LogsModel.distinct('action');
			const items = await LogsModel.distinct('item.name');
			const columns = await LogsModel.aggregate([
				{ $match: filter },
				{ $project: { keys: { $objectToArray: '$$ROOT' } } },
				{ $unwind: '$keys' },
				{ $group: { _id: '$keys.k' } },
			]).exec();
			const excludesColumns = [
				'_id',
				'id',
				'createdAt',
				'updatedAt',
				'__v',
				'quantity',
				'from',
				'to',
				'item',
				'action',
				'message',
			];
			return {
				items: logs,
				totalRows,
				page: Number(page),
				totalPages: Math.ceil(totalRows / pageSize),
				columns: columns
					.map(key => key._id.toString())
					.filter(key => !excludesColumns.includes(key)),
				filterData: {
					action: actions,
					item: items,
				},
			};
		} catch (error: any) {
			const { name, message, statusCode } = error;
			const errorMessage = `${name} - ${message}`;
			response.status(statusCode).send({ errors: [{ message: errorMessage }] });
		}
	}

	public async store({ request, response }: HttpContextContract) {
		try {
			const log = await request.all();
			const newLog = await LogsModel.create(log);
			const discordWebhooks = await DiscordWebhooksModel.aggregate([
				{
					$facet: {
						query1: [
							{
								$match: {
									fromId: newLog.from.id,
									toId: newLog.to.id,
									action: newLog.action,
								},
							},
						],
						query2: [
							{
								$match: {
									action: newLog.action,
									toId: newLog.to.id,
									fromId: null,
								},
							},
						],
						query3: [
							{
								$match: {
									action: newLog.action,
									fromId: newLog.from.id,
									toId: null,
								},
							},
						],
						query4: [
							{
								$match: {
									action: newLog.action,
									toId: null,
									fromId: null,
								},
							},
						],
					},
				},
				{
					$project: {
						result: {
							$cond: [
								{ $ne: [{ $size: '$query1' }, 0] },
								'$query1',
								{
									$cond: [
										{ $ne: [{ $size: '$query2' }, 0] },
										'$query2',
										{
											$cond: [
												{ $ne: [{ $size: '$query3' }, 0] },
												'$query3',
												'$query4',
											],
										},
									],
								},
							],
						},
					},
				},
				{
					$unwind: '$result',
				},
				{
					$replaceRoot: { newRoot: '$result' },
				},
			]);

			if (discordWebhooks?.[0])
				discordWebhooks?.[0].url.split(';').map(url =>
					this.messageQueue.push({
						message: newLog.message,
						url,
					}),
				);

			return newLog;
		} catch (error: any) {
			const { name, message, statusCode } = error;
			const errorMessage = `${name} - ${message}`;
			response
				.status(statusCode || 500)
				.send({ errors: [{ message: errorMessage }] });
		}
	}

	private async sendMessage() {
		if (this.isSending || this.messageQueue.length === 0) {
			// Si un envoi est déjà en cours ou s'il n'y a pas de messages dans la file d'attente, ne rien faire.
			setTimeout(this.sendMessage, 1000); // Vérif bien à nouveau la file d'attente toutes les 1 seconde
			return;
		}

		this.isSending = true;
		const messQueue = this.messageQueue.shift();
		try {
			const webhookClient = new WebhookClient({ url: messQueue!.url! });

			// Envoyer le message à Discord
			await webhookClient.send(messQueue!.message!);

			// eslint-disable-next-line no-console
			console.log('Message sent successfully');
			setTimeout(this.sendMessage, 5000); // Attendez 5 secondes avant d'envoyer le prochain message
		} catch (err) {
			console.error('Error while sending message:', err);
			this.messageQueue.unshift(messQueue!); // Replacer le message en haut de la file d'attente
			setTimeout(this.sendMessage, 10000); // Attendez 10 secondes avant de réessayer
		} finally {
			this.isSending = false;
		}
	}
}
