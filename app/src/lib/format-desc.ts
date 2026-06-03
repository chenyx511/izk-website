export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Safe subset: paragraphs, **bold**, bullet lines starting with ・ */
export function formatDescToHtml(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/・/g, "•")
    .split("\n")
    .map((line) => (line.trim() ? `<p class="mb-2">${line}</p>` : ""))
    .join("");
}
