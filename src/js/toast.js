export function showToast(title, message) {
  const html = /* html */ `
     <li
          role="status"
          aria-live="off"
          aria-atomic="true"
          tabindex="0"
          data-state="open"
          data-swipe-direction="right"
          class="app-toast"
          data-radix-collection-item=""
        >
          <div class="app-toast__body">
            <p class="app-toast__title">${title} !</p>
            <p class="app-toast__message">${message}</p>
          </div>
          <button
            type="button"
            class="app-toast__close"
            toast-close=""
            data-radix-toast-announce-exclude=""
            aria-label="Dismiss notification"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="app-toast__close-icon"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </li>`;

  const stack = document.querySelector(".app-toast-stack");
  stack.insertAdjacentHTML("beforeend", html);

  const toast = stack.lastElementChild;

  toast.querySelector(".app-toast__close").addEventListener("click", () => {
    toast.classList.add("app-toast--exit");
    toast.addEventListener("animationend", () => toast.remove());
  });

  setTimeout(() => {
    toast.classList.add("app-toast--exit");
    toast.addEventListener("animationend", () => toast.remove());
  }, 3000);
}
