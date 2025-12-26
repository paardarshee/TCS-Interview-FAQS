import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";

export async function POST(req: Request) {
	const { question, answer } = await req.json();

	if (!question) {
		return Response.json({ error: "Invalid payload" }, { status: 400 });
	}

	await connectDB();

	const created = await Question.create({
		question,
		// answer,
		// author: authorId, // User._id
	});

	return Response.json(created);
}

export async function GET() {
	await connectDB();

	const faqs = await Question.find()
		.where("answer")
		.ne(null)
		.select("question answer")
		.sort({ createdAt: 1 });

	return Response.json(faqs);
}
