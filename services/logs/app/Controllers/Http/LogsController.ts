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
			return {
				items: logs,
				totalRows,
				page,
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
