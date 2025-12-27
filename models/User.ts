import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
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

UserSchema.index({ "otp.expiresAt": 1 }, { expireAfterSeconds: 0 });

export const User = models.User || model("User", UserSchema);
