import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		const { question } = await req.json();
		const cookieStore = await cookies();
		const authToken = cookieStore.get("auth_token"); // your http-only cookie
		if (!question) {
			return Response.json({ error: "Invalid payload" }, { status: 400 });
		}
		if (!authToken) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		//decode the user id from base64
		const authorId = Buffer.from(authToken.value, "base64").toString("ascii");

		await connectDB();

		const created = await Question.create(
			{
				question,
				author: authorId, // User._id
			},
			{ session }
		);

		await session.commitTransaction();
		session.endSession();

		return Response.json(created);
	} catch (error) {
		console.error("Error in POST /api/faqs:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function GET() {
	await connectDB();

	const faqs = await Question.find()
		.where("answer")
		.ne(null)
		.select("question answer")
		.sort({ createdAt: -1 });

	return Response.json(faqs);
}
