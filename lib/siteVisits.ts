import { connectDB } from "./db";
import { SiteStats } from "@/models/siteStats";

export async function incrementSiteVisit() {
	await connectDB();

	await SiteStats.findOneAndUpdate(
		{ key: "global" },
		{ $inc: { visits: 1 } },
		{ upsert: true }
	);
}

export async function getSiteVisits() {
	await connectDB();
	const stats = await SiteStats.findOne({ key: "global" });
	return stats?.visits ?? 0;
}
