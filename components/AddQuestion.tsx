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
		<div className="max-w-2xl mx-auto px-4 py-8">
			<form
				onSubmit={handleSubmit}
				className="rounded-2xl border border-gray-200 dark:border-zinc-800
                   bg-white dark:bg-zinc-900 p-6 space-y-4"
			>
				<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
					Add Question
				</h2>

				<textarea
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					rows={2}
					placeholder="Enter question"
					className="w-full rounded-xl border border-gray-300 dark:border-zinc-700
                     bg-white dark:bg-zinc-950 px-4 py-2.5
                     text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-orange-400/60"
				/>

				<button
					type="submit"
					disabled={loading}
					className="inline-flex items-center rounded-xl
                     bg-orange-500 px-4 py-2
                     text-sm font-medium text-white
                     hover:bg-orange-600 disabled:opacity-60"
				>
					{loading ? "Saving..." : "Add Question"}
				</button>
			</form>
		</div>
	);
}
