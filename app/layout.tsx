import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://tcs-interview-faqs.vercel.app"),

	title: {
		default: "TCS Interview FAQs | Ninja, Digital & Prime Preparation",
		template: "%s | TCS Interview FAQs",
	},

	description:
		"Centralized TCS interview FAQs for Ninja, Digital, and Prime roles. Covers real interview questions, syllabus, preparation strategy, expected behavior, and selection insights.",

	applicationName: "TCS Interview FAQs",

	authors: [
		{
			name: "Paardarshee",
		},
	],

	creator: "Paardarshee",

	keywords: [
		"TCS Interview FAQs",
		"TCS Ninja Interview",
		"TCS Digital Interview",
		"TCS Prime Interview",
		"TCS Interview Questions",
		"TCS Interview Preparation",
		"TCS Syllabus",
		"TCS Interview Experience",
	],

	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://tcs-interview-faqs.vercel.app",
		siteName: "TCS Interview FAQs",
		title: "TCS Interview FAQs | Ninja, Digital & Prime",
		description:
			"FAQs and preparation guidance for TCS Ninja, Digital, and Prime interviews based on real candidate experience.",
	},

	twitter: {
		card: "summary_large_image",
		title: "TCS Interview FAQs",
		description:
			"Real TCS interview FAQs and preparation insights for Ninja, Digital, and Prime roles.",
	},

	robots: {
		index: true,
		follow: true,
	},

	category: "education",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16`}
			>
				{children}
				<Footer />
			</body>
		</html>
	);
}
