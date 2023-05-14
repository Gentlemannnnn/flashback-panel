import mongoose, { Schema } from '@ioc:Mongoose';

const schema = new Schema<any>(
	{
		name: { type: String, required: true },
		url: { type: String, required: true },
		fromId: { type: String, default: null },
		toId: { type: String, default: null },
		action: { type: String, required: true },
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

export default mongoose.model<any>('discord-webhooks', schema);
