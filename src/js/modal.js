import { appState } from "./state.js";

export function openModal(id) {
  const modal = document.getElementById(id);

  const doc = appState.documents.find((d) => d.id === appState.currentDocumentId);

  const nameSpan = document.getElementById("modal-doc-name");

  if (nameSpan && doc) {
    nameSpan.textContent = doc.name || "untitled.md";
  }

  if (modal && typeof modal.showModal === "function") {
    modal.showModal();
  }
}

export function closeModal(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const modal = element.tagName === "DIALOG" ? element : element.closest("dialog");
  if (modal && typeof modal.close === "function") {
    modal.close();
  }
}
