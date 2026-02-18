import { parseMarkdown } from "./parse.js";
import { updatePreview } from "./preview.js";


export async function initTextarea() {
  const content = await getPlaceholder();

  const textarea = document.getElementById("textarea");

  if (!textarea) return;

  textarea.value = content;
  updatePreview(parseMarkdown(content));

  textarea.addEventListener("input", () => {
    const text = textarea.value;
    const html = parseMarkdown(text);
    updatePreview(html);
  });
}

async function getPlaceholder() {
  const response = await fetch("/data.json");
  const data = await response.json();
  return data[1].content;
}
