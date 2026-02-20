import { showToast } from "./toast.js";
import { saveDocument, newDocument, deleteDocument } from "./state.js";
import { openModal, closeModal } from "./modal.js";

async function copyMarkdown() {
  const text = document.getElementById("textarea").value;

  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied", "Markdown copied to clipboard !");
  } catch (error) {
    console.log(error);
  }
}

export function initActions() {
  const actionBtns = document.querySelectorAll("[data-quick-action], .modal [data-action]");

  actionBtns.forEach((btn) => {
    const action = btn.dataset.quickAction || btn.dataset.action;
    btn.addEventListener("click", () => {
      if (action === "copy") {
        copyMarkdown();
      }

      if (action === "download") {
        downloadMarkdown();
      }

      if (action === "save") {
        saveDocument();
        showToast("Saved", "File has been saved !");
      }

      if (action === "new-document") {
        newDocument();
        showToast("New Document", "New document created !");
      }

      if (action === "delete") {
        openModal("delete-modal");
      }

      if (action === "cancel") {
        closeModal("cancel");
      }

      if (action === "delete-document") {
        deleteDocument();
        showToast("Deleted", "Document has been deleted !");
        closeModal("delete-modal");
      }
    });
  });
}

function downloadMarkdown() {
  const content = document.getElementById("textarea").value;
  const documentName = document.getElementById("document-name").value;

  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = documentName;
  a.click();
  showToast("Downloaded", "Markdown file saved !");
  URL.revokeObjectURL(url);
}
