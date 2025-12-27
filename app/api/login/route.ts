import data from "@/data/db.json";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
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
	const { answer, id, mail, name } = await request.json();
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
	let user = await User.findOne({ email: mail });
	if (!user) {
		user = new User({ name, email: mail });
		await user.save();
	}

	//base-64 encode the user_id
	const userId = Buffer.from(user._id.toString()).toString("base64");
	// add this to cookie as "auth_token"
	const cookieStore = await cookies();
	cookieStore.set("auth_token", userId, { httpOnly: true, path: "/" });

	return Response.json({ success: true, message: "Correct answer" });
}
