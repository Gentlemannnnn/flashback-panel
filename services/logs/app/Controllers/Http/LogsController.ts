import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
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

			return await LogsModel.create(log);
		} catch (error: any) {
			const { name, message, statusCode } = error;
			const errorMessage = `${name} - ${message}`;
			response
				.status(statusCode || 500)
				.send({ errors: [{ message: errorMessage }] });
		}
	}
}
