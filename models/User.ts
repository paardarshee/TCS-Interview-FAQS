import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
		user_id: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

export const User = models.User || model("User", UserSchema);
