// ===== Reaction Speed Test =====
const box = document.getElementById('reaction-box');
const bestEl = document.getElementById('best-score');
let best = +localStorage.getItem('reactionBest') || null;
if (best) bestEl.textContent = best;

let state = 'idle'; // idle -> waiting -> ready -> done
let timeoutId = null;
let startTime = 0;

function ripple(e) {
  const r = document.createElement('span');
  r.className = 'reaction-ripple';
  const rect = box.getBoundingClientRect();
  r.style.left = `${e.clientX - rect.left - 10}px`;
  r.style.top = `${e.clientY - rect.top - 10}px`;
  r.style.width = r.style.height = '20px';
  box.appendChild(r);
  setTimeout(() => r.remove(), 600);
}

function showScorePopup(text) {
  const p = document.createElement('span');
  p.className = 'score-popup';
  p.textContent = text;
  p.style.left = '50%';
  p.style.top = '50%';
  box.appendChild(p);
  setTimeout(() => p.remove(), 800);
}

function startRound() {
  state = 'waiting';
  box.textContent = 'Wait for green...';
  box.classList.remove('go');
  box.classList.add('wait');
  const delay = 1000 + Math.random() * 3000;
  timeoutId = setTimeout(() => {
    state = 'ready';
    box.classList.remove('wait');
    box.classList.add('go');
    box.textContent = 'Click now!';
    startTime = performance.now();
  }, delay);
}

box.addEventListener('click', (e) => {
  ripple(e);

  if (state === 'idle' || state === 'done') {
    startRound();
    return;
  }

  if (state === 'waiting') {
    clearTimeout(timeoutId);
    box.textContent = 'Too soon! Click to retry.';
    state = 'done';
    return;
  }

  if (state === 'ready') {
    const reaction = Math.round(performance.now() - startTime);
    box.classList.remove('go');
    box.textContent = `${reaction} ms — Click to retry`;
    showScorePopup(`${reaction} ms`);
    if (!best || reaction < best) {
      best = reaction;
      localStorage.setItem('reactionBest', best);
      bestEl.textContent = best;
    }
    state = 'done';
  }
});
