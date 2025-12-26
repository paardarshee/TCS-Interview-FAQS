export default function Footer() {
	return (
		<footer
			className="
        fixed bottom-0 left-0 right-0 z-40
        border-t border-gray-200 dark:border-zinc-800
        bg-white/90 dark:bg-zinc-950/90 backdrop-blur
      "
		>
			<div className="max-w-4xl mx-auto px-4 py-1.5 text-center space-y-1">
				{/* Attribution */}
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Developed by{" "}
					<a
						href="https://paardarshee.bio.link/"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-orange-500 hover:underline"
					>
						paardarshee
					</a>
				</p>

				{/* Disclaimer */}
				<p className="text-xs text-gray-500 dark:text-gray-500 leading-snug">
					These FAQs reflect my personal experience and point of view. They are
					not officially verified by TCS, and accuracy is not guaranteed.
				</p>
			</div>
		</footer>
	);
}
