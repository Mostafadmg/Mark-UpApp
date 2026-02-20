import { appState, updateSidebar, loadDocument } from "./state.js";

export function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".app-header__menu-button");

  if (!sidebar || !menuBtn) return;

  function toggleSidebar() {
    const isOpen = updateSidebar(); // ← Gets new value back
    sidebar.classList.toggle("sidebar--open", isOpen);
  }

  menuBtn.addEventListener("click", toggleSidebar);

  const documentItems = document.getElementById("document-items");

  documentItems.addEventListener("click", (event) => {
    const btn = event.target.closest(".document-item");

    if (!btn) return;

    const id = btn.id;

    const doc = appState.documents.find((d) => {
      return d.id === id;
    });
    loadDocument(doc);
    renderSidebar();
  });
}

export function renderSidebar() {
  const documentItems = document.getElementById("document-items");
  if (!documentItems) return;

  const documentIconUrl = new URL("../../assets/icon-document.svg", import.meta.url);
  const documents = appState.documents; // [array of all document objects]

  const documenItems = documents.map((document) => {
    const isActive = appState.currentDocumentId === document.id;
    const updatedValue = (document.updatedAt || "").replace(" ", " • ");
    const name = document.name || "untitled.md";

    const html = `<button class="document-item${isActive ? " document-item--active" : ""}" type="button" id ="${document.id}" data-document-name ="${name}">
                <img class="document-item-icon" src="${documentIconUrl}" alt="" />
                <div class="document-info">
                  <p class="document-date">
                    <span class="document-date-label">Updated</span>
                    <span class="document-date-value">${updatedValue}</span>
                  </p>
                  <p class="document-name">${name}</p>
                </div>
              </button>`;

    return html;
  });

  documentItems.innerHTML = documenItems.join("");
}
