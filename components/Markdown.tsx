function parseInline(text: string): React.ReactNode[] {
	const result: React.ReactNode[] = [];
	let buffer = "";
	let i = 0;

	while (i < text.length) {
		// Bold **text**
		if (text[i] === "*" && text[i + 1] === "*") {
			if (buffer) {
				result.push(buffer);
				buffer = "";
			}
			i += 2;
			const end = text.indexOf("**", i);
			if (end !== -1) {
				result.push(<strong key={i}>{text.slice(i, end)}</strong>);
				i = end + 2;
				continue;
			}
		}

		// Italic *text*
		if (text[i] === "*") {
			if (buffer) {
				result.push(buffer);
				buffer = "";
			}
			i += 1;
			const end = text.indexOf("*", i);
			if (end !== -1) {
				result.push(<em key={i}>{text.slice(i, end)}</em>);
				i = end + 1;
				continue;
			}
		}

		// Inline code `code`
		if (text[i] === "`") {
			if (buffer) {
				result.push(buffer);
				buffer = "";
			}
			i += 1;
			const end = text.indexOf("`", i);
			if (end !== -1) {
				result.push(
					<code
						key={i}
						className="rounded bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-sm"
					>
						{text.slice(i, end)}
					</code>
				);
				i = end + 1;
				continue;
			}
		}

		// Link [text](url)
		if (text[i] === "[") {
			const textEnd = text.indexOf("]", i);
			const urlStart = text.indexOf("(", textEnd);
			const urlEnd = text.indexOf(")", urlStart);

			if (textEnd !== -1 && urlStart !== -1 && urlEnd !== -1) {
				if (buffer) {
					result.push(buffer);
					buffer = "";
				}

				const label = text.slice(i + 1, textEnd);
				const url = text.slice(urlStart + 1, urlEnd);

				result.push(
					<a
						key={i}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-orange-500 underline"
					>
						{label}
					</a>
				);

				i = urlEnd + 1;
				continue;
			}
		}

		buffer += text[i];
		i++;
	}

	if (buffer) result.push(buffer);
	return result;
}

type Props = {
	content: string;
};

export default function Markdown({ content }: Props) {
	const lines = content.split("\n");

	return (
		<div className="space-y-3">
			{lines.map((line, index) => {
				// Headings
				if (line.startsWith("### ")) {
					return (
						<h3 key={index} className="text-lg font-semibold">
							{parseInline(line.replace("### ", ""))}
						</h3>
					);
				}

				if (line.startsWith("## ")) {
					return (
						<h2 key={index} className="text-xl font-semibold">
							{parseInline(line.replace("## ", ""))}
						</h2>
					);
				}

				if (line.startsWith("# ")) {
					return (
						<h1 key={index} className="text-2xl font-semibold">
							{parseInline(line.replace("# ", ""))}
						</h1>
					);
				}

				// Bullet list
				if (line.startsWith("- ")) {
					return (
						<li key={index} className="ml-5 list-disc">
							{parseInline(line.replace("- ", ""))}
						</li>
					);
				}

				// Empty line
				if (!line.trim()) {
					return <div key={index} />;
				}

				// Paragraph
				return (
					<p key={index} className="leading-relaxed">
						{parseInline(line)}
					</p>
				);
			})}
		</div>
	);
}
