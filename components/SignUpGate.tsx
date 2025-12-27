"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginQuestion = {
	id: string;
	question: string;
	options?: string[];
};

const fetchQuestion = async (): Promise<LoginQuestion> => {
	const res = await fetch("/api/login");
	return await res.json();
};
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpGate() {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [answer, setAnswer] = useState("");

	const [challenge, setChallenge] = useState<LoginQuestion | null>(null);
	const [error, setError] = useState("");

	/* ---------- Open Modal & Fetch Challenge ---------- */
	async function handleOpen() {
		setError("");
		setAnswer("");
		setName("");
		setEmail("");
		setChallenge(null);
		setOpen(true);

		try {
			const data = await fetchQuestion();
			setChallenge(data);
		} catch {
			setError("Failed to load verification challenge");
		}
	}

	/* ---------- Submit ---------- */
	async function handleSubmit() {
		setError("");

		if (!name.trim()) return setError("Name is required");
		if (!EMAIL_REGEX.test(email)) return setError("Invalid email address");
		if (!answer) return setError("Answer is required");
		if (!challenge?.id) return setError("Invalid verification state");

		setLoading(true);

		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					email,
					answer,
					id: challenge.id,
				}),
			});

			const data = await res.json();

			if (data.success) {
				setOpen(false);
				router.refresh(); // refresh "/"
			} else {
				setName("");
				setEmail("");
				setAnswer("");
				const newQuestion = await fetchQuestion();
				setChallenge(newQuestion);
				setError(data.message || "Verification failed");
			}
		} catch {
			setError("Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			{/* Trigger Button */}
			<div className="flex justify-center">
				<button
					onClick={handleOpen}
					className="rounded-lg bg-orange-500 px-4 py-2
				text-xs font-medium text-white
				hover:bg-orange-600"
				>
					Add new Question
				</button>
			</div>

			{/* Modal */}
			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
					<div
						className="w-full max-w-md rounded-xl
                          bg-white dark:bg-zinc-900
                          border border-gray-200 dark:border-zinc-800
                          p-5 space-y-4"
					>
						{/* Title */}
						<h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
							Verify to continue
						</h2>

						{/* Name */}
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Name"
							className="w-full rounded-lg border px-3 py-2 text-sm
                         bg-white dark:bg-zinc-950
                         border-gray-300 dark:border-zinc-700"
						/>

						{/* Email */}
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							className="w-full rounded-lg border px-3 py-2 text-sm
                         bg-white dark:bg-zinc-950
                         border-gray-300 dark:border-zinc-700"
						/>

						{/* Challenge */}
						{challenge && (
							<div className="space-y-2">
								<p className="text-xs text-gray-600 dark:text-gray-400">
									{challenge.question}
								</p>

								{challenge.options ? (
									<div className="flex flex-wrap gap-2">
										{challenge.options.map((opt) => (
											<button
												key={opt}
												onClick={() => setAnswer(opt)}
												className={`rounded-md border px-3 py-1.5 text-xs
                          ${
														answer === opt
															? "border-orange-500 text-orange-600"
															: "border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-gray-400"
													}`}
											>
												{opt}
											</button>
										))}
									</div>
								) : (
									<input
										value={answer}
										onChange={(e) => setAnswer(e.target.value)}
										placeholder="Your answer"
										className="w-full rounded-lg border px-3 py-2 text-sm
                               bg-white dark:bg-zinc-950
                               border-gray-300 dark:border-zinc-700"
									/>
								)}
							</div>
						)}

						{/* Error */}
						{error && <p className="text-xs text-red-500">{error}</p>}

						{/* Actions */}
						<div className="flex justify-end gap-2 pt-2">
							<button
								onClick={() => setOpen(false)}
								className="text-xs text-gray-500"
							>
								Cancel
							</button>

							<button
								onClick={handleSubmit}
								disabled={loading}
								className="rounded-lg bg-orange-500 px-4 py-1.5
                           text-xs font-medium text-white
                           hover:bg-orange-600 disabled:opacity-60"
							>
								{loading ? "Submitting…" : "Submit"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
