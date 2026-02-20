import { appState } from "./state.js";

export function saveToStorage() {
  localStorage.setItem(
    "markdown-editor",
    JSON.stringify({
      documents: appState.documents,
      currentDocumentId: appState.currentDocumentId,
    }),
  );
}

export function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem("markdown-editor"));
  return data;
}
