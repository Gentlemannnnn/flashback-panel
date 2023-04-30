import mongoose, { Schema } from '@ioc:Mongoose';

const FromToSchema = new Schema<any>({
	id: { type: String, required: false },
	sessionId: { type: String },
	discordId: { type: String },
	steamName: { type: String },
	name: { type: String },
	type: { type: String, required: true },
});

const ItemSchema = new Schema<any>({
	id: { type: String, required: false },
	name: { type: String, required: true },
});

const schema = new Schema<any>(
	{
		from: { type: FromToSchema, required: true },
		to: { type: FromToSchema, default: null },
		action: { type: String, required: true },
		item: { type: ItemSchema, default: null },
		quantity: { type: Number, default: null },
		message: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
	},
	{ strict: false },
);

schema.set('toJSON', {
	transform(_, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
		delete ret.__t;
	},
	virtuals: true,
});

export default mongoose.model<any>('logs', schema);
