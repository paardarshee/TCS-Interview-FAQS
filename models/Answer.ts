import { Schema, model, models } from "mongoose";

const AnswerSchema = new Schema(
	{
		answer_id: {
			type: String,
			required: true,
			unique: true,
		},
		question_id: {
			type: Schema.Types.ObjectId,
			ref: "Question",
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		answer: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

export const Answer = models.Answer || model("Answer", AnswerSchema);
