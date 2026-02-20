import { initTextarea } from "./editor.js";
import { initSidebar } from "./sidebar.js";
import { initTheme } from "./theme.js";
import { initToolbar } from "./toolbar.js";
import { initView } from "./view.js";
import { initActions } from "./action.js";
import { renderSidebar } from "./sidebar.js";
import { loadFromStorage } from "./storage.js";
import { appState } from "./state.js";
// Get the menu button

function restoreState() {
  const data = loadFromStorage();
  if (!data) return;

  appState.currentDocumentId = data.currentDocumentId;
  appState.documents = data.documents;
}

restoreState();

function initQuickActionsMode() {
  const quickActions = document.querySelector(".app-header__quick-actions");
  if (!quickActions) return;

  const tabletAndUp = window.matchMedia("(min-width: 768px)");

  const syncQuickActionsState = () => {
    if (tabletAndUp.matches) {
      quickActions.setAttribute("open", "");
      return;
    }

    quickActions.removeAttribute("open");
  };

  syncQuickActionsState();

  if (typeof tabletAndUp.addEventListener === "function") {
    tabletAndUp.addEventListener("change", syncQuickActionsState);
  } else {
    tabletAndUp.addListener(syncQuickActionsState);
  }
}

initSidebar();
initTheme();
initTextarea();
initQuickActionsMode();
initToolbar();
initView();
initActions();
renderSidebar();
