(function () {
  const saved = localStorage.getItem("kj_theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("kj_theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("kj_theme", "dark");
      }
    });
  });
})();
