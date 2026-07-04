// ===== Component Loader: navbar / footer / welcome-screen include =====

async function loadComponent(placeholderId, path) {
  const el = document.getElementById(placeholderId);
  if (!el) return;
  const res = await fetch(path);
  el.innerHTML = await res.text();
}

async function includeComponents() {
  await Promise.all([
    loadComponent('navbar-placeholder', 'components/navbar.html'),
    loadComponent('footer-placeholder', 'components/footer.html'),
    loadComponent('welcome-placeholder', 'components/welcome-screen.html'),
  ]);
  document.dispatchEvent(new Event('components:loaded'));
}

document.addEventListener('DOMContentLoaded', includeComponents);
