// ===== Tic Tac Toe with Minimax AI =====
const boardEl = document.getElementById('ttt-board');
const statusEl = document.getElementById('ttt-status');
const resetBtn = document.getElementById('ttt-reset');

let board = Array(9).fill('');
const HUMAN = 'X';
const AI = 'O';
let gameOver = false;

const WINS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(b) {
  for (const [a, c, d] of WINS) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return b.includes('') ? null : 'draw';
}

function render() {
  boardEl.innerHTML = board
    .map((cell, i) => `<div class="ttt-cell ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''}" data-i="${i}">${cell}</div>`)
    .join('');
  boardEl.querySelectorAll('.ttt-cell').forEach((cellEl) => {
    cellEl.addEventListener('click', () => handleMove(+cellEl.dataset.i));
  });
}

function minimax(b, depth, isMax) {
  const winner = checkWinner(b);
  if (winner === HUMAN) return -10 + depth;
  if (winner === AI) return 10 - depth;
  if (winner === 'draw') return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = AI;
        best = Math.max(best, minimax(b, depth + 1, false));
        b[i] = '';
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = HUMAN;
        best = Math.min(best, minimax(b, depth + 1, true));
        b[i] = '';
      }
    }
    return best;
  }
}

function aiMove() {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = AI;
      const score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  if (move !== -1) board[move] = AI;
}

function handleMove(i) {
  if (gameOver || board[i]) return;
  board[i] = HUMAN;
  render();

  let winner = checkWinner(board);
  if (winner) return endGame(winner);

  statusEl.textContent = "AI's turn...";
  setTimeout(() => {
    aiMove();
    render();
    winner = checkWinner(board);
    if (winner) return endGame(winner);
    statusEl.textContent = 'Your turn (X)';
  }, 300);
}

function endGame(winner) {
  gameOver = true;
  statusEl.textContent = winner === 'draw' ? "It's a draw!" : winner === HUMAN ? 'You win!' : 'AI wins!';
}

resetBtn.addEventListener('click', () => {
  board = Array(9).fill('');
  gameOver = false;
  statusEl.textContent = 'Your turn (X)';
  render();
});

render();
