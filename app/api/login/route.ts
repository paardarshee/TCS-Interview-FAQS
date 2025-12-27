import data from "@/data/db.json";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function GET() {
	const challenge =
		data.challanges[Math.floor(Math.random() * data.challanges.length)];

	return Response.json({
		id: challenge.id,
		question: challenge.question,
		options: challenge.options ?? null,
	});
}

export async function POST(request: Request) {
	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		const { answer, id, email, name } = await request.json();
		const challenge = data.challanges.find((c) => c.id === id);

		if (!challenge) {
			return Response.json({ error: "Challenge not found" }, { status: 404 });
		}

		const isCorrect = challenge.answer.toLowerCase() === answer.toLowerCase();
		//create a new user using mail and name in database if isCorrect is true
		if (!isCorrect) {
			return Response.json({ success: false, message: "Incorrect answer" });
		}
		await connectDB();
		let user = await User.findOne({ email });
		if (!user) {
			user = new User({ name, email }, { session });
			await user.save({ session });
		}

		//base-64 encode the user_id
		const userId = Buffer.from(user._id.toString()).toString("base64");
		// add this to cookie as "auth_token"
		const cookieStore = await cookies();
		cookieStore.set("auth_token", userId, { httpOnly: true, path: "/" });
		await session.commitTransaction();
		session.endSession();

		return Response.json({ success: true, message: "Correct answer" });
	} catch (error) {
		console.error("Error in POST /api/login:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
