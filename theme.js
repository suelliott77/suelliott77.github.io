(function () {
  const root = document.documentElement;

  function getInitialTheme() {
    // 1) If user has a saved preference, use it
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }

    // 2) Otherwise, use system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // 3) Fallback
    return "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  function updateIcon(btn) {
    const isDark = root.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
  }

  // Apply initial theme *before* DOMContentLoaded
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    updateIcon(toggle);

    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("theme", next);
      updateIcon(toggle);
    });
  });
})();
