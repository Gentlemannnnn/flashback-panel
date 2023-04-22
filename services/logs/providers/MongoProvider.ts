import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import Env from '@ioc:Adonis/Core/Env';
import { Mongoose } from 'mongoose';

export default class MongoProvider {
	constructor(protected app: ApplicationContract) {}

	public register() {
		const mongoose = new Mongoose();
		mongoose.connect(Env.get('DB_DSN'));
		this.app.container.singleton('Mongoose', () => mongoose);
	}

	public async shutdown() {
		await this.app.container.use('Mongoose').disconnect();
	}
}
