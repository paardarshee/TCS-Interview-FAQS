"use client";

import { useState } from "react";
import Markdown from "./Markdown";

type FAQ = {
	question: string;
	answer: string;
};

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section className="max-w-4xl mx-auto px-4 py-16">
			{/* Header */}
			<div className="mb-12 text-center">
				<h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
					Frequently Asked Questions
				</h2>
				<p className="mt-3 text-gray-500 dark:text-gray-400">
					Everything you need to know
				</p>
			</div>

			{/* FAQ List */}
			<div className="space-y-3">
				{faqs.map((faq, index) => {
					const isOpen = openIndex === index;

					return (
						<div
							key={index}
							className={`
                rounded-2xl border transition-all duration-300
                ${
									isOpen
										? "border-orange-400/60 bg-white dark:bg-zinc-900 shadow-md"
										: "border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/60 hover:border-orange-400/40"
								}
              `}
						>
							<button
								onClick={() => setOpenIndex(isOpen ? null : index)}
								className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
							>
								<span className="text-lg font-medium text-gray-900 dark:text-gray-100">
									{faq.question}
								</span>

								{/* Icon */}
								<span
									className={`
                    flex h-9 w-9 items-center justify-center rounded-full border
                    transition-all duration-300
                    ${
											isOpen
												? "rotate-180 border-orange-400/60 bg-orange-50 dark:bg-orange-500/10"
												: "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
										}
                  `}
								>
									<svg
										className="h-4 w-4 text-orange-500"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</span>
							</button>

							{/* Answer */}
							<div
								className={`
    grid transition-all duration-300 ease-in-out
    ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
  `}
							>
								<div className="overflow-hidden px-6 pb-6">
									<div
										className="
        mt-2 pl-4 border-l-2 border-orange-400/40
        text-sm text-gray-600 dark:text-gray-400
        leading-relaxed
      "
									>
										<Markdown content={faq.answer} />
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
