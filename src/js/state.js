export const appState = {
  // UI State
  theme: "light", // "light" or "dark"
  sidebarOpen: false, // boolean

  // Document Management
  currentDocumentId: null, // null or string (e.g., "doc_123")

  display: "split",

  documents: [
    {
      id: "doc_1",
      name: "welcome.md",
      content: "# Welcome to Markdown Editor\n\nStart typing...",
      createdAt: 1703001234567,
      updatedAt: 1703001234567,
    },
  ],
};
export function updateTheme(theme) {
  if (appState.theme === theme) return;
  appState.theme = theme;
  return appState.theme; // ← Just return, no DOM
}

export function updateSidebar() {
  appState.sidebarOpen = !appState.sidebarOpen;
  return appState.sidebarOpen; // ← Just return, no DOM
}

export function updateDisplay(display) {
  appState.display = display;
}
