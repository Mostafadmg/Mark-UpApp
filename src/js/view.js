import { appState, updateDisplay } from "./state.js";

function renderState(display) {
  const textareaContainer = document.querySelector(".textarea-container");
  const previewContainer = document.querySelector(".preview-container");

  if (!display) return;
  // reset everything first
  textareaContainer.classList.add("hidden");
  previewContainer.classList.add("hidden");

  // then show only what the current mode needs
  if (display === "editor") {
    textareaContainer.classList.remove("hidden");
  } else if (display === "preview") {
    previewContainer.classList.remove("hidden");
  } else {
    textareaContainer.classList.remove("hidden");
    previewContainer.classList.remove("hidden");
  }
}

export function initView() {
  const viewBtns = document.querySelectorAll("[data-view-control]");
  const toggleBtns = document.querySelectorAll("[data-view-toggle]");

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.action;
      updateDisplay(mode);
      renderState(mode);
      viewBtns.forEach((b) => b.classList.remove("quick-btn--active"));
      btn.classList.add("quick-btn--active");
    });
  });

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentMode = appState.display;
      const targetPanel = btn.dataset.action;
      const newMode = currentMode === "split" ? targetPanel : "split";
      updateDisplay(newMode);
      renderState(newMode);
    });
  });
}
