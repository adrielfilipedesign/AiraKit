/* ============================================
   AiraKit — Dark Mode
   Handles theme persistence and system preference sync.
   Requires: main.js (loaded before this file)
   ============================================ */

(function () {
  const STORAGE_KEY = 'airakit-theme';
  const root        = document.documentElement;

  /* ------------------------------------------
     Detect saved preference or fall back to system
     ------------------------------------------ */
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /* ------------------------------------------
     Apply theme via data-theme on <html>
     ------------------------------------------ */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('data-current-theme', theme);
    });
  }

  /* ------------------------------------------
     Toggle between light and dark
     ------------------------------------------ */
  function toggleTheme() {
    const current = root.getAttribute('data-theme') || getPreferredTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* ------------------------------------------
     Apply theme immediately to avoid flash
     ------------------------------------------ */
  applyTheme(getPreferredTheme());

  /* ------------------------------------------
     Bind toggle buttons on DOM ready
     ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });
  });

  /* ------------------------------------------
     React to system preference changes in real time
     (only if user hasn't set a manual preference)
     ------------------------------------------ */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ------------------------------------------
     Public API
     ------------------------------------------ */
  window.AiraKit = window.AiraKit || {};
  window.AiraKit.toggleTheme = toggleTheme;
  window.AiraKit.setTheme    = applyTheme;
  window.AiraKit.getTheme    = function () { return root.getAttribute('data-theme'); };
})();