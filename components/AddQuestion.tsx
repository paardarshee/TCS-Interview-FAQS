"use client";

import { useState } from "react";

export default function AddQuestion() {
	const [question, setQuestion] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!question.trim()) return;

		setLoading(true);

		await fetch("/api/faqs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ question }),
		});

		setQuestion("");
		setLoading(false);
	}

	return (
		<div className="max-w-3xl mx-auto px-4">
			<form
				onSubmit={handleSubmit}
				className="rounded-xl border border-gray-200 dark:border-zinc-800
                   bg-white dark:bg-zinc-900 px-5 py-4 space-y-3"
			>
				<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
					Add a new question
				</h3>

				<textarea
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					rows={2}
					placeholder="Enter question"
					className="w-full rounded-lg border border-gray-300 dark:border-zinc-700
                     bg-white dark:bg-zinc-950 px-3 py-2 text-[16px] text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-orange-400/60"
				/>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="inline-flex items-center rounded-lg
                       bg-orange-500 px-3 py-1.5
                       text-xs font-medium text-white
                       hover:bg-orange-600 disabled:opacity-60"
					>
						{loading ? "Saving..." : "Add"}
					</button>
				</div>
			</form>
		</div>
	);
}
