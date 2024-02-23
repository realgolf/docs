/**
 * Highlights code blocks in HTML content using the specified themes and languages.
 *
 * @param htmlContent The HTML content containing code blocks to be highlighted.
 * @returns The HTML content with highlighted code blocks.
 */
import he from 'he';
import { getHighlighter } from 'shiki';

const highlighter = await getHighlighter({
	themes: ['slack-dark'],
	langs: ['javascript', 'html', 'css', 'svelte', 'scss', 'git-commit', 'markdown', 'json']
});

const code_regex = /<pre><code\s+class="language-(\w+)">([\s\S]+?)<\/code><\/pre>/gi;

const style_regex = /<pre([^>]*)style="[^"]*background-color:[^"]*"(.*?)>/g;

export function highlight_code(htmlContent: string) {
	return htmlContent.replace(code_regex, (_, lang, code) => {
		const code_decoded = he.decode(code);
		const code_highlighted = highlighter.codeToHtml(code_decoded.trim(), { lang });
		const code_without_bg = code_highlighted.replace(style_regex, '<pre$1$2>');

		return code_without_bg;
	});
}
