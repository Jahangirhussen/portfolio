// ===== Main: Navbar, Footer, Scroll Reveal, Stats, Back-to-top =====

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('navbar-burger');
  const links = document.querySelector('.navbar__links');

  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('active'));
  }

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

function initFooter() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, [data-reveal]');
  if (!revealEls.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el, i) => {
    if (!el.style.transitionDelay) el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });
}

function initStats() {
  document.querySelectorAll('.stats__number').forEach((el) => {
    const target = +el.dataset.count;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 25);
  });
}

function initWelcomeScreen() {
  const welcome = document.getElementById('welcome-screen');
  if (!welcome) return;
  setTimeout(() => {
    welcome.classList.add('welcome-screen--hide');
    setTimeout(() => welcome.remove(), 600);
  }, 800);
}

const IMG_FALLBACK_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='%2300e5ff'/><stop offset='1' stop-color='%23a855f7'/></linearGradient></defs>" +
      "<rect width='100%' height='100%' fill='url(%23g)' opacity='0.25'/>" +
      "<text x='50%' y='50%' font-size='40' text-anchor='middle' dominant-baseline='middle'>🖼</text></svg>"
  );

function initImageFallback() {
  document.addEventListener(
    'error',
    (e) => {
      const img = e.target;
      if (img.tagName === 'IMG' && img.src !== IMG_FALLBACK_SRC) {
        img.src = IMG_FALLBACK_SRC;
      }
    },
    true
  );
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.addEventListener('components:loaded', () => {
  initNavbar();
  initFooter();
  initReveal();
  initWelcomeScreen();
});

document.addEventListener('DOMContentLoaded', () => {
  initStats();
  initBackToTop();
  initImageFallback();
});
