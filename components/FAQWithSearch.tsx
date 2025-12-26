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
		<section className="max-w-4xl mx-auto px-4">
			{/* Search Card */}
			<div
				className="mb-8 rounded-2xl border border-gray-200 dark:border-zinc-800
                      bg-white dark:bg-zinc-900 shadow-sm"
			>
				<div className="px-5 py-4">
					<div className="relative">
						{/* Icon */}
						<span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
							<svg
								className="h-5 w-5"
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
							placeholder="Search questions or answers..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="
                w-full rounded-xl border border-gray-300 dark:border-zinc-700
                bg-white dark:bg-zinc-950 pl-12 pr-4 py-3
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-orange-400/60
              "
						/>
					</div>

					{/* Result count */}
					<div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
						{query
							? `${filteredFaqs.length} result${
									filteredFaqs.length === 1 ? "" : "s"
							  } found`
							: `${faqs.length} total FAQs`}
					</div>
				</div>
			</div>

			{/* Results */}
			<FAQSection faqs={filteredFaqs} />

			{/* Empty State */}
			{filteredFaqs.length === 0 && (
				<p className="mt-8 text-center text-gray-500 dark:text-gray-400">
					No matching FAQs found
				</p>
			)}
		</section>
	);
}
