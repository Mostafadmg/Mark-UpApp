import { parseMarkdown } from "./parse.js";
import { updatePreview } from "./preview.js";
import { appState } from "./state.js";

export async function initTextarea() {
  const textarea = document.getElementById("textarea");
  const documentNameInput = document.getElementById("document-name");

  if (!textarea) return;

  async function getPlaceholder() {
    try {
      const dataUrl = new URL("../../data.json", import.meta.url);
      const response = await fetch(dataUrl);
      const data = await response.json();
      return data?.[1]?.content ?? "";
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  function getCurrentDocument() {
    return (
      appState.documents.find((document) => document.id === appState.currentDocumentId) ??
      appState.documents[0] ??
      null
    );
  }

  const currentDocument = getCurrentDocument();
  if (!currentDocument) return;

  let initialContent = currentDocument.content ?? "";
  if (!initialContent) {
    initialContent = await getPlaceholder();
    currentDocument.content = initialContent;
  }

  textarea.value = initialContent;
  if (documentNameInput) {
    documentNameInput.value = currentDocument.name ?? "";
  }
  updatePreview(parseMarkdown(initialContent));

  function markCurrentDocumentDirty() {
    const activeDocument = getCurrentDocument();
    if (!activeDocument) return;
    activeDocument.isDirty = true;
  }

  textarea.addEventListener("input", () => {
    const text = textarea.value;
    const html = parseMarkdown(text);
    updatePreview(html);

    const activeDocument = getCurrentDocument();
    if (activeDocument) {
      activeDocument.content = text;
      markCurrentDocumentDirty();
    }
  });

  if (documentNameInput) {
    documentNameInput.addEventListener("input", () => {
      const activeDocument = getCurrentDocument();
      if (!activeDocument) return;
      activeDocument.name = documentNameInput.value;
      markCurrentDocumentDirty();
    });
  }

  window.addEventListener("beforeunload", (event) => {
    const hasUnsavedChanges = appState.documents.some((document) => document.isDirty);
    if (!hasUnsavedChanges) return;
    event.preventDefault();
    event.returnValue = "";
  });
}
