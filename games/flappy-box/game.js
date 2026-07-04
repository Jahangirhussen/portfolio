// ===== Flappy Box =====
const canvas = document.getElementById('flappy-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');

let best = +localStorage.getItem('flappyBest') || 0;
bestEl.textContent = best;

const GRAVITY = 0.45;
const FLAP = -7.5;
const PIPE_GAP = 130;
const PIPE_WIDTH = 50;
const PIPE_SPEED = 2.6;

let box, pipes, frame, score, running, over;

function reset() {
  box = { x: 60, y: canvas.height / 2, size: 22, vy: 0 };
  pipes = [];
  frame = 0;
  score = 0;
  running = true;
  over = false;
  scoreEl.textContent = 0;
  canvas.classList.remove('shake');
}

function spawnPipe() {
  const top = 40 + Math.random() * (canvas.height - PIPE_GAP - 80);
  pipes.push({ x: canvas.width, top, passed: false });
}

function flap() {
  if (over) {
    reset();
    return;
  }
  box.vy = FLAP;
}

function update() {
  if (!running) return;
  frame++;
  box.vy += GRAVITY;
  box.y += box.vy;

  if (frame % 90 === 0) spawnPipe();

  pipes.forEach((p) => (p.x -= PIPE_SPEED));
  pipes = pipes.filter((p) => p.x + PIPE_WIDTH > 0);

  pipes.forEach((p) => {
    if (!p.passed && p.x + PIPE_WIDTH < box.x) {
      p.passed = true;
      score++;
      scoreEl.textContent = score;
    }
    const hitX = box.x + box.size > p.x && box.x < p.x + PIPE_WIDTH;
    const hitY = box.y < p.top || box.y + box.size > p.top + PIPE_GAP;
    if (hitX && hitY) endGame();
  });

  if (box.y + box.size > canvas.height || box.y < 0) endGame();
}

function endGame() {
  if (over) return;
  over = true;
  running = false;
  canvas.classList.add('shake');
  if (score > best) {
    best = score;
    localStorage.setItem('flappyBest', best);
    bestEl.textContent = best;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#a855f7';
  pipes.forEach((p) => {
    ctx.fillRect(p.x, 0, PIPE_WIDTH, p.top);
    ctx.fillRect(p.x, p.top + PIPE_GAP, PIPE_WIDTH, canvas.height - p.top - PIPE_GAP);
  });

  ctx.fillStyle = '#00e5ff';
  ctx.shadowColor = '#00e5ff';
  ctx.shadowBlur = 12;
  ctx.fillRect(box.x, box.y, box.size, box.size);
  ctx.shadowBlur = 0;

  if (over) {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over — click to retry', canvas.width / 2, canvas.height / 2);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

canvas.addEventListener('click', flap);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') flap();
});

reset();
loop();
