import { renderSidebar } from "./sidebar.js";
import { updatePreview } from "./preview.js";
import { parseMarkdown } from "./parse.js";
import { saveToStorage } from "./storage.js";

export const appState = {
  theme: "light",
  sidebarOpen: false,
  display: "split",
  currentDocumentId: "doc_1",
  documents: [
    {
      id: "doc_1",
      name: "welcome.md",
      content: "",
      updatedAt:
        new Date().toLocaleDateString("en-GB") +
        " " +
        new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      isDirty: false,
    },
  ],
};

export function updateTheme(theme) {
  if (appState.theme === theme) return;
  appState.theme = theme;
  return appState.theme;
}

export function updateSidebar() {
  appState.sidebarOpen = !appState.sidebarOpen;
  return appState.sidebarOpen;
}

export function updateDisplay(display) {
  appState.display = display;
}

export function saveDocument() {
  const docName = document.getElementById("document-name").value;
  const content = document.getElementById("textarea").value;
  const doc = appState.documents.find((d) => d.id === appState.currentDocumentId);

  if (doc) {
    doc.name = docName;
    doc.content = content;
    doc.updatedAt =
      new Date().toLocaleDateString("en-GB") +
      " " +
      new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    doc.isDirty = false;
  } else {
    const newDoc = {
      id: crypto.randomUUID(),
      name: docName,
      content: content,
      updatedAt:
        new Date().toLocaleDateString("en-GB") +
        " " +
        new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      isDirty: false,
    };
    appState.currentDocumentId = newDoc.id;
    appState.documents.push(newDoc);
  }

  saveToStorage();
  renderSidebar();
}

export function newDocument() {
  const documentName = document.getElementById("document-name");
  const newDocument = {
    id: crypto.randomUUID(),
    name: "",
    content: "",
    updatedAt:
      new Date().toLocaleDateString("en-GB") +
      " " +
      new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    isDirty: false,
  };

  const textarea = document.getElementById("textarea");
  textarea.value = "";
  appState.currentDocumentId = newDocument.id;
  appState.documents.push(newDocument);
  documentName.value = "";
  updatePreview(parseMarkdown(""));
  saveToStorage();
  renderSidebar();
}

export function deleteDocument() {
  appState.documents = appState.documents.filter((d) => d.id !== appState.currentDocumentId);

  if (appState.documents.length > 0) {
    loadDocument(appState.documents[0]);
  } else {
    appState.currentDocumentId = null;
    document.getElementById("textarea").value = "";
    document.getElementById("document-name").value = "";
    updatePreview(parseMarkdown(""));
  }

  saveToStorage();
  renderSidebar();
}

export function loadDocument(doc) {
  const textarea = document.getElementById("textarea");
  const docName = document.getElementById("document-name");
  textarea.value = doc.content;
  docName.value = doc.name;
  appState.currentDocumentId = doc.id;
  updatePreview(parseMarkdown(doc.content));
}
