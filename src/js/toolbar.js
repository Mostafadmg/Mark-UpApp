import { parseMarkdown } from "./parse.js";
import { updatePreview } from "./preview.js";

function insertMarkDown(textarea, action) {
  const before = textarea.value.substring(0, textarea.selectionStart);
  const selected = textarea.value.substring(
    textarea.selectionStart,
    textarea.selectionEnd,
  );
  const after = textarea.value.substring(textarea.selectionEnd);

  const actions = {
    bold: { type: "inline", prefix: "**", suffix: "**", placeholder: "bold text" },
    italic: { type: "inline", prefix: "*", suffix: "*", placeholder: "italic text" },
    code: { type: "inline", prefix: "`", suffix: "`", placeholder: "code" },
    strikethrough: {
      type: "inline",
      prefix: "~~",
      suffix: "~~",
      placeholder: "struck text",
    },
    link: { type: "inline", prefix: "[", suffix: "](url)", placeholder: "link text" },
    image: { type: "inline", prefix: "![", suffix: "](url)", placeholder: "alt text" },
    h1: { type: "block", prefix: "# ", placeholder: "Heading 1" },
    h2: { type: "block", prefix: "## ", placeholder: "Heading 2" },
    h3: { type: "block", prefix: "### ", placeholder: "Heading 3" },
    quote: { type: "block", prefix: "> ", placeholder: "Blockquote" },
    ul: { type: "block", prefix: "- ", placeholder: "List item" },
    ol: { type: "block", prefix: "1. ", placeholder: "List item" },
    hr: { type: "block", prefix: "\n---\n", placeholder: "" },
  };

  const selectedAction = actions[action];
  if (!selectedAction) return;

  const text = selected ? selected : selectedAction.placeholder;

  if (selectedAction.type === "inline") {
    const wrappedText = selectedAction.prefix + text + selectedAction.suffix;
    textarea.value = before + wrappedText + after;
  } else {
    const wrappedText = selectedAction.prefix + text;
    textarea.value = before + wrappedText + after;
  }

  const html = parseMarkdown(textarea.value);
  updatePreview(html);
}

export function initToolbar() {
  const textarea = document.getElementById("textarea");
  const toolbarBtns = document.querySelectorAll(".toolbar-btn");

  toolbarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      insertMarkDown(textarea, btn.dataset.action);
    });
  });
}
