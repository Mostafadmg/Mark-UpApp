import { showToast } from "./toast.js";

async function copyMarkdown() {
  const text = document.getElementById("textarea").value;

  try {
    await navigator.clipboard.writeText(text);
    showToast("Copy", "Markdown copied to clipboard!");
  } catch (error) {
    console.log(error);
  }
}

export function initActions() {
  const actionBtns = document.querySelectorAll("[data-quick-action]");

  actionBtns.forEach((btn) => {
    const action = btn.dataset.quickAction;
    btn.addEventListener("click", () => {
      if (action === "copy") {
        copyMarkdown();
      }
    });
  });
}
