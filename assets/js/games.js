// ===== Play Zone Page =====
document.addEventListener('components:loaded', () => {
  document.querySelectorAll('.game-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.1}s`;
  });
});
