export function initTheme() {
  const themeInput = document.querySelector(".theme-toggle-input");

  if (!themeInput) {
    return;
  }

  const root = document.documentElement;

  function toggleTheme() {
    const isChecked = themeInput.checked;

    if (isChecked) {
      root.setAttribute("data-theme", "light");
      console.log("Theme: LIGHT");
    } else {
      root.removeAttribute("data-theme");
      console.log("Theme: DARK");
    }
  }

  // Initialize theme on load
  toggleTheme();

  // Listen for changes
  themeInput.addEventListener("change", toggleTheme);
}
