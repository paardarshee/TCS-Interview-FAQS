import { Schema, model, models } from "mongoose";

const SiteStatsSchema = new Schema({
	key: {
		type: String,
		unique: true,
		required: true,
	},
	visits: {
		type: Number,
		default: 0,
	},
});

export const SiteStats =
	models.SiteStats || model("SiteStats", SiteStatsSchema);
