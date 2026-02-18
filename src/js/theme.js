import { updateTheme } from "./state.js";

export function initTheme() {
  const themeInput = document.querySelector(".theme-toggle-input");
  if (!themeInput) return;

  function toggleTheme() {
    const theme = themeInput.checked ? "light" : "dark";
    const newTheme = updateTheme(theme); // ← Gets new value back

    // THIS module handles its own DOM
    if (newTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  toggleTheme();
  themeInput.addEventListener("change", toggleTheme);
}
