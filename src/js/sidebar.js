export function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".app-header__menu-button");

  if (!sidebar || !menuBtn) {
    return;
  }

  // Use SECOND
  menuBtn.addEventListener("click", toggleSidebar);

  // Define FIRST
  function toggleSidebar() {
    sidebar.classList.toggle("sidebar--open");
  }
}
