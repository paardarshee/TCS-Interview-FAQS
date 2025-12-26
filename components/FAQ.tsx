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
		<section className="max-w-3xl mx-auto px-4">
			<div className="space-y-2">
				{faqs.map((faq, index) => {
					const isOpen = openIndex === index;

					return (
						<div
							key={index}
							className={`
                rounded-xl border transition-colors
                ${
									isOpen
										? "border-orange-400/50 bg-white dark:bg-zinc-900"
										: "border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/60 hover:border-orange-400/30"
								}
              `}
						>
							<button
								onClick={() => setOpenIndex(isOpen ? null : index)}
								className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
							>
								<span className="text-md font-medium text-gray-900 dark:text-gray-100">
									{faq.question}
								</span>

								{/* Icon */}
								<span
									className={`
                    flex h-7 w-7 items-center justify-center rounded-full border
                    transition-transform
                    ${
											isOpen
												? "rotate-180 border-orange-400/50 bg-orange-50 dark:bg-orange-500/10"
												: "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
										}
                  `}
								>
									<svg
										className="h-3.5 w-3.5 text-orange-500"
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
                  grid transition-all duration-200 ease-in-out
                  ${
										isOpen
											? "grid-rows-[1fr] opacity-100"
											: "grid-rows-[0fr] opacity-0"
									}
                `}
							>
								<div className="overflow-hidden px-4 pb-4">
									<div
										className="
                      mt-1 pl-3 border-l border-orange-400/40
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
