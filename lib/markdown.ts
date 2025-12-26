export function parseMarkdown(input: string): string {
	let output = input;

	// Escape HTML (important)
	output = output
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

	// Headings
	output = output.replace(/^## (.*)$/gm, "<h2>$1</h2>");
	output = output.replace(/^# (.*)$/gm, "<h1>$1</h1>");

	// Bold
	output = output.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

	// Italic
	output = output.replace(/\*(.*?)\*/g, "<em>$1</em>");

	// Inline code
	output = output.replace(/`(.*?)`/g, "<code>$1</code>");

	// Links
	output = output.replace(
		/\[(.*?)\]\((.*?)\)/g,
		`<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`
	);

	// Line breaks
	output = output.replace(/\n/g, "<br />");

	return output;
}
