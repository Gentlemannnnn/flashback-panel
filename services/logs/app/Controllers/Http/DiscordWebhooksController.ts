import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DiscordWebhooksModel from 'App/Models/DiscordWebhooks';
import LogsModel from 'App/Models/Logs';

export default class LogsController {
	public async index({ response, request }: HttpContextContract) {
		try {
			const {
				sort = {},
				filter = {},
				pageSize = 10,
				page = 1,
			} = await request.all();
			const discordWebhooks = await DiscordWebhooksModel.find(filter).sort(
				sort,
			);
			const availableActions = await LogsModel.distinct('action');
			const totalRows = await DiscordWebhooksModel.count(filter);
			return {
				actions: availableActions,
				items: discordWebhooks,
				totalRows,
				page: Number(page),
				totalPages: Math.ceil(totalRows / pageSize),
			};
		} catch (error: any) {
			const { name, message, statusCode } = error;
			const errorMessage = `${name} - ${message}`;
			response.status(statusCode).send({ errors: [{ message: errorMessage }] });
		}
	}

	public async store({ request, response }: HttpContextContract) {
		try {
			const discordWebhook = await request.all();
			return await DiscordWebhooksModel.create(discordWebhook);
		} catch (error: any) {
			const { name, message, statusCode } = error;
			const errorMessage = `${name} - ${message}`;
			response
				.status(statusCode || 500)
				.send({ errors: [{ message: errorMessage }] });
		}
	}

	public async update({
		request,
		response,
		params: { id },
	}: HttpContextContract) {
		try {
			const data = request.all();
			const updatedDiscordWebhook =
				await DiscordWebhooksModel.findByIdAndUpdate(id, data);

			return updatedDiscordWebhook;
		} catch (error: any) {
			const { name, message, statusCode } = error;
			const errorMessage = `${name} - ${message}`;
			response.status(statusCode).send({ errors: [{ message: errorMessage }] });
		}
	}

	public async destroy({ response, params: { id } }: HttpContextContract) {
		try {
			await DiscordWebhooksModel.findByIdAndDelete(id);

			return null;
		} catch (error: any) {
			const { name, message, statusCode } = error;
			const errorMessage = `${name} - ${message}`;
			response.status(statusCode).send({ errors: [{ message: errorMessage }] });
		}
	}
}
