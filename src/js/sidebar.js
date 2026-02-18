import { updateSidebar } from "./state.js";

export function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".app-header__menu-button");

  if (!sidebar || !menuBtn) return;

  function toggleSidebar() {
    const isOpen = updateSidebar(); // ← Gets new value back
    sidebar.classList.toggle("sidebar--open", isOpen);
  }

  menuBtn.addEventListener("click", toggleSidebar);
}
