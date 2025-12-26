"use client";

import { useState, useMemo } from "react";
import FAQSection from "@/components/FAQ";

type FAQ = {
	question: string;
	answer: string;
};

export default function FAQWithSearch({ faqs }: { faqs: FAQ[] }) {
	const [query, setQuery] = useState("");

	const filteredFaqs = useMemo(() => {
		if (!query.trim()) return faqs;

		const lower = query.toLowerCase();

		return faqs.filter(
			(faq) =>
				faq.question.toLowerCase().includes(lower) ||
				faq.answer.toLowerCase().includes(lower)
		);
	}, [query, faqs]);

	return (
		<section className="max-w-3xl mx-auto px-4">
			{/* Search */}
			<div className="mb-4">
				<div
					className="relative rounded-xl border border-gray-200 dark:border-zinc-800
                     bg-white dark:bg-zinc-900"
				>
					{/* Icon */}
					<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</span>

					<input
						type="text"
						placeholder="Search FAQs"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="
              w-full rounded-xl border-none
              bg-transparent pl-10 pr-3 py-2.5
              text-sm text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-orange-400/60
            "
					/>
				</div>

				{/* Result count */}
				<div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
					{query
						? `${filteredFaqs.length} result${
								filteredFaqs.length === 1 ? "" : "s"
						  }`
						: `${faqs.length} FAQs`}
				</div>
			</div>

			{/* Results */}
			<FAQSection faqs={filteredFaqs} />

			{/* Empty State */}
			{filteredFaqs.length === 0 && (
				<p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
					No matching FAQs found
				</p>
			)}
		</section>
	);
}
