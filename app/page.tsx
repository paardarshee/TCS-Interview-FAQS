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
		<>
			<AddQuestion />
			<FAQWithSearch faqs={faqs} />
		</>
	);
}
