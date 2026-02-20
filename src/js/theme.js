import { updateTheme } from "./state.js";

export function initTheme() {
  const themeInput = document.querySelector(".theme-toggle-input");
  if (!themeInput) return;

  const root = document.documentElement;
  let transitionTimeoutId;

  function applyTheme(theme, animate = false) {
    if (animate) {
      root.classList.add("theme-switching");
    }

    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }

    if (animate) {
      window.clearTimeout(transitionTimeoutId);
      transitionTimeoutId = window.setTimeout(() => {
        root.classList.remove("theme-switching");
      }, 220);
    }
  }

  const initialTheme = themeInput.checked ? "light" : "dark";
  updateTheme(initialTheme);
  applyTheme(initialTheme);

  themeInput.addEventListener("change", () => {
    const nextTheme = themeInput.checked ? "light" : "dark";
    updateTheme(nextTheme);
    applyTheme(nextTheme, true);
  });
}
