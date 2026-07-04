// ===== Theme Toggle: Premium AI Dark <-> Google Glass White =====
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', saved);

  function updateIcon() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = root.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
  }

  document.addEventListener('components:loaded', () => {
    updateIcon();
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon();
      });
    }
  });
})();
