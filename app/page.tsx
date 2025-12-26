import FAQWithSearch from "@/components/FAQWithSearch";
import AddQuestion from "@/components/AddQuestion";

async function getFAQs() {
	const homeRoute =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://tcs-interview-faqs.vercel.app";

	const res = await fetch(`${homeRoute}/api/faqs`, {
		cache: "no-store",
	});

	return res.json();
}

export default async function Page() {
	const faqs = await getFAQs();

	return (
		<main className="max-w-5xl mx-auto px-4">
			{/* Page Header */}
			<header className="mt-6 mb-6 text-center">
				<h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
					Frequently Asked Questions
				</h1>
				<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
					Everything you need to know
				</p>
			</header>

			{/* Admin Action */}
			<section className="mb-8">
				<AddQuestion />
			</section>

			{/* FAQ Content */}
			<section>
				<FAQWithSearch faqs={faqs} />
			</section>
		</main>
	);
}
