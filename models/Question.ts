import { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema(
	{
		question: {
			type: String,
			required: true,
			trim: true,
		},
		answer: {
			type: String,
			trim: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const Question = models.Question || model("Question", QuestionSchema);
