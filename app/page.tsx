import FAQWithSearch from "@/components/FAQWithSearch";
import AddQuestion from "@/components/AddQuestion";
import SignUpGate from "@/components/SignUpGate";
import { incrementSiteVisit, getSiteVisits } from "@/lib/siteVisits";
import { cookies } from "next/headers";

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

const inProduction = process.env.NODE_ENV === "production";
export default async function Page() {
	// increment once per page request
	if (inProduction) {
		await incrementSiteVisit();
	}
	const cookieStore = await cookies();
	const authToken = cookieStore.get("auth_token"); // your http-only cookie
	const isAuthenticated = Boolean(authToken);

	const [faqs, visits] = await Promise.all([getFAQs(), getSiteVisits()]);

	return (
		<main className="max-w-5xl mx-auto px-4">
			{/* Header */}
			<header className="mt-6 mb-6 text-center space-y-2">
				<h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
					Frequently Asked Questions
				</h1>

				<p className="text-sm text-gray-500 dark:text-gray-400">
					Everything you need to know
				</p>

				{/* Visit counter */}
				{/* Visit counter */}
				<div
					className="inline-flex items-center gap-2 rounded-full
                border border-gray-200 dark:border-zinc-800
                bg-gray-50 dark:bg-zinc-900
                px-3 py-1 text-xs
                text-gray-600 dark:text-gray-400"
				>
					<span className="text-orange-500">●</span>
					<span>{visits.toLocaleString()} total visits</span>
				</div>
			</header>

			{/* Admin action */}
			<section className="mb-6 flex justify-center">
				{/* check for auth token from http-only cookie if present show AddQuestion else just a plus button on clicking it there will be a popup created with asking name, email, and fetches /api/login and share the question */}
				{isAuthenticated && <AddQuestion />}
				{!isAuthenticated && <SignUpGate />}
			</section>

			{/* Content */}
			<FAQWithSearch faqs={faqs} />
		</main>
	);
}
