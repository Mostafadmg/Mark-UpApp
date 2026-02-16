const appState = {
  // UI State
  theme: "light", // "light" or "dark"
  sidebarOpen: false, // boolean

  // Document Management
  currentDocumentId: null, // null or string (e.g., "doc_123")

  documents: [
    {
      id: "doc_1",
      name: "welcome.md",
      content: "# Welcome to Markdown Editor\n\nStart typing...",
      createdAt: 1703001234567,
      updatedAt: 1703001234567,
    },
    // More documents...
  ],
};
