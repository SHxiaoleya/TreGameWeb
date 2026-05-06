const SIZE = 4;
let board = [];
let score = 0;
let won = false;
let gameOver = false;

const gridEl = document.getElementById('grid');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const mask = document.getElementById('mask');
const maskTitle = document.getElementById('maskTitle');
const maskText = document.getElementById('maskText');
const maskRestartBtn = document.getElementById('maskRestartBtn');
const boardWrap = document.getElementById('boardWrap');
const themeSelect = document.getElementById('themeSelect');

const THEMES = {
  classic: {
    '--bg': '#faf8ef',
    '--panel': '#bbada0',
    '--cell': '#cdc1b4',
    '--text-dark': '#776e65',
    '--text-light': '#f9f6f2',
    '--btn-bg': '#8f7a66',

    '--t2-bg':'#eee4da','--t2-text':'#776e65',
    '--t4-bg':'#ede0c8','--t4-text':'#776e65',
    '--t8-bg':'#f2b179','--t8-text':'#f9f6f2',
    '--t16-bg':'#f59563','--t16-text':'#f9f6f2',
    '--t32-bg':'#f67c5f','--t32-text':'#f9f6f2',
    '--t64-bg':'#f65e3b','--t64-text':'#f9f6f2',
    '--t128-bg':'#edcf72','--t128-text':'#f9f6f2',
    '--t256-bg':'#edcc61','--t256-text':'#f9f6f2',
    '--t512-bg':'#edc850','--t512-text':'#f9f6f2',
    '--t1024-bg':'#edc53f','--t1024-text':'#f9f6f2',
    '--t2048-bg':'#edc22e','--t2048-text':'#f9f6f2',
    '--tbig-bg':'#3c3a32','--tbig-text':'#f9f6f2'
  },

  pink: {
    '--bg': '#fff0f6',
    '--panel': '#f7a8c6',
    '--cell': '#ffd1e1',
    '--text-dark': '#7a2448',
    '--text-light': '#fff7fb',
    '--btn-bg': '#e75480',

    '--t2-bg':'#ffe3ef','--t2-text':'#7a2448',
    '--t4-bg':'#ffd0e4','--t4-text':'#7a2448',
    '--t8-bg':'#ffb3d1','--t8-text':'#ffffff',
    '--t16-bg':'#ff8fbe','--t16-text':'#ffffff',
    '--t32-bg':'#ff6fae','--t32-text':'#ffffff',
    '--t64-bg':'#f06595','--t64-text':'#ffffff',
    '--t128-bg':'#e64980','--t128-text':'#ffffff',
    '--t256-bg':'#d6336c','--t256-text':'#ffffff',
    '--t512-bg':'#c2255c','--t512-text':'#ffffff',
    '--t1024-bg':'#a61e4d','--t1024-text':'#ffffff',
    '--t2048-bg':'#8a1c44','--t2048-text':'#ffffff',
    '--tbig-bg':'#5a1030','--tbig-text':'#ffffff'
  },

  red: {
    '--bg': '#fff1f0',
    '--panel': '#ff6b6b',
    '--cell': '#ffb3b3',
    '--text-dark': '#7f1d1d',
    '--text-light': '#fff5f5',
    '--btn-bg': '#e03131',

    '--t2-bg':'#ffe3e3','--t2-text':'#7f1d1d',
    '--t4-bg':'#ffc9c9','--t4-text':'#7f1d1d',
    '--t8-bg':'#ffa8a8','--t8-text':'#ffffff',
    '--t16-bg':'#ff8787','--t16-text':'#ffffff',
    '--t32-bg':'#ff6b6b','--t32-text':'#ffffff',
    '--t64-bg':'#fa5252','--t64-text':'#ffffff',
    '--t128-bg':'#f03e3e','--t128-text':'#ffffff',
    '--t256-bg':'#e03131','--t256-text':'#ffffff',
    '--t512-bg':'#c92a2a','--t512-text':'#ffffff',
    '--t1024-bg':'#a61e1e','--t1024-text':'#ffffff',
    '--t2048-bg':'#8b1a1a','--t2048-text':'#ffffff',
    '--tbig-bg':'#5c1010','--tbig-text':'#ffffff'
  },

  yolk: {
    '--bg': '#fff9db',
    '--panel': '#ffd43b',
    '--cell': '#ffe066',
    '--text-dark': '#6b4f00',
    '--text-light': '#fffdf3',
    '--btn-bg': '#fab005',

    '--t2-bg':'#fff3bf','--t2-text':'#6b4f00',
    '--t4-bg':'#ffec99','--t4-text':'#6b4f00',
    '--t8-bg':'#ffe066','--t8-text':'#5f3f00',
    '--t16-bg':'#ffd43b','--t16-text':'#5f3f00',
    '--t32-bg':'#fcc419','--t32-text':'#4a3200',
    '--t64-bg':'#fab005','--t64-text':'#4a3200',
    '--t128-bg':'#f59f00','--t128-text':'#3d2a00',
    '--t256-bg':'#f08c00','--t256-text':'#3d2a00',
    '--t512-bg':'#e67700','--t512-text':'#ffffff',
    '--t1024-bg':'#d9480f','--t1024-text':'#ffffff',
    '--t2048-bg':'#c92a2a','--t2048-text':'#ffffff',
    '--tbig-bg':'#7f2700','--tbig-text':'#ffffff'
  },

  green: {
    '--bg': '#ebfbee',
    '--panel': '#69db7c',
    '--cell': '#b2f2bb',
    '--text-dark': '#1b4332',
    '--text-light': '#f4fff6',
    '--btn-bg': '#2b8a3e',

    '--t2-bg':'#d3f9d8','--t2-text':'#1b4332',
    '--t4-bg':'#b2f2bb','--t4-text':'#1b4332',
    '--t8-bg':'#8ce99a','--t8-text':'#0f2f24',
    '--t16-bg':'#69db7c','--t16-text':'#0f2f24',
    '--t32-bg':'#51cf66','--t32-text':'#ffffff',
    '--t64-bg':'#40c057','--t64-text':'#ffffff',
    '--t128-bg':'#37b24d','--t128-text':'#ffffff',
    '--t256-bg':'#2f9e44','--t256-text':'#ffffff',
    '--t512-bg':'#2b8a3e','--t512-text':'#ffffff',
    '--t1024-bg':'#237032','--t1024-text':'#ffffff',
    '--t2048-bg':'#1b5e2b','--t2048-text':'#ffffff',
    '--tbig-bg':'#10391a','--tbig-text':'#ffffff'
  },

  blue: {
    '--bg': '#e7f5ff',
    '--panel': '#74c0fc',
    '--cell': '#a5d8ff',
    '--text-dark': '#0b3d62',
    '--text-light': '#f4fbff',
    '--btn-bg': '#1c7ed6',

    '--t2-bg':'#d0ebff','--t2-text':'#0b3d62',
    '--t4-bg':'#a5d8ff','--t4-text':'#0b3d62',
    '--t8-bg':'#74c0fc','--t8-text':'#ffffff',
    '--t16-bg':'#4dabf7','--t16-text':'#ffffff',
    '--t32-bg':'#339af0','--t32-text':'#ffffff',
    '--t64-bg':'#228be6','--t64-text':'#ffffff',
    '--t128-bg':'#1c7ed6','--t128-text':'#ffffff',
    '--t256-bg':'#1971c2','--t256-text':'#ffffff',
    '--t512-bg':'#1864ab','--t512-text':'#ffffff',
    '--t1024-bg':'#0b5394','--t1024-text':'#ffffff',
    '--t2048-bg':'#084c87','--t2048-text':'#ffffff',
    '--tbig-bg':'#052f5f','--tbig-text':'#ffffff'
  },

  purple: {
    '--bg': '#f3f0ff',
    '--panel': '#b197fc',
    '--cell': '#d0bfff',
    '--text-dark': '#3f1d78',
    '--text-light': '#faf7ff',
    '--btn-bg': '#7048e8',

    '--t2-bg':'#e5dbff','--t2-text':'#3f1d78',
    '--t4-bg':'#d0bfff','--t4-text':'#3f1d78',
    '--t8-bg':'#b197fc','--t8-text':'#ffffff',
    '--t16-bg':'#9775fa','--t16-text':'#ffffff',
    '--t32-bg':'#845ef7','--t32-text':'#ffffff',
    '--t64-bg':'#7950f2','--t64-text':'#ffffff',
    '--t128-bg':'#7048e8','--t128-text':'#ffffff',
    '--t256-bg':'#6741d9','--t256-text':'#ffffff',
    '--t512-bg':'#5f3dc4','--t512-text':'#ffffff',
    '--t1024-bg':'#4c2f9b','--t1024-text':'#ffffff',
    '--t2048-bg':'#40267f','--t2048-text':'#ffffff',
    '--tbig-bg':'#2a184f','--tbig-text':'#ffffff'
  },

  black: {
    '--bg': '#121212',
    '--panel': '#2a2a2a',
    '--cell': '#3a3a3a',
    '--text-dark': '#e9ecef',
    '--text-light': '#ffffff',
    '--btn-bg': '#000000',

    '--t2-bg':'#2f2f2f','--t2-text':'#f1f3f5',
    '--t4-bg':'#3a3a3a','--t4-text':'#f1f3f5',
    '--t8-bg':'#4a4a4a','--t8-text':'#ffffff',
    '--t16-bg':'#5a5a5a','--t16-text':'#ffffff',
    '--t32-bg':'#6b6b6b','--t32-text':'#ffffff',
    '--t64-bg':'#7c7c7c','--t64-text':'#ffffff',
    '--t128-bg':'#8d8d8d','--t128-text':'#ffffff',
    '--t256-bg':'#9e9e9e','--t256-text':'#ffffff',
    '--t512-bg':'#b0b0b0','--t512-text':'#111111',
    '--t1024-bg':'#c2c2c2','--t1024-text':'#111111',
    '--t2048-bg':'#d4d4d4','--t2048-text':'#111111',
    '--tbig-bg':'#f1f3f5','--tbig-text':'#111111'
  }
};

function applyTheme(name) {
  const theme = THEMES[name] || THEMES.classic;
  const rootStyle = document.documentElement.style;
  for (const key in theme) rootStyle.setProperty(key, theme[key]);
  localStorage.setItem('theme2048', name);

  mask.style.background = (name === 'black')
    ? 'rgba(30,30,30,0.78)'
    : 'rgba(238, 228, 218, 0.73)';
}

function initBoard() {
  board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  score = 0;
  won = false;
  gameOver = false;
  updateScore();
  hideMask();
  addRandomTile();
  addRandomTile();
  render();
}

function updateScore() { scoreEl.textContent = score; }

function addRandomTile() {
  const empty = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) empty.push([r, c]);
    }
  }
  if (!empty.length) return;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function render() {
  gridEl.innerHTML = '';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = board[r][c];
      const cell = document.createElement('div');
      cell.className = 'cell ' + (v === 0 ? 'n0' : (v <= 2048 ? 'n' + v : 'nBig'));
      cell.textContent = v === 0 ? '' : v;
      gridEl.appendChild(cell);
    }
  }
  updateScore();
}

function slideAndMergeLine(line) {
  const filtered = line.filter(n => n !== 0);
  const merged = [];
  let gained = 0;

  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const v = filtered[i] * 2;
      merged.push(v);
      gained += v;
      if (v === 2048) won = true;
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }

  while (merged.length < SIZE) merged.push(0);
  return { line: merged, gained };
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function moveLeft() {
  let moved = false;
  for (let r = 0; r < SIZE; r++) {
    const old = [...board[r]];
    const { line, gained } = slideAndMergeLine(old);
    board[r] = line;
    score += gained;
    if (!arraysEqual(old, line)) moved = true;
  }
  return moved;
}

function moveRight() {
  let moved = false;
  for (let r = 0; r < SIZE; r++) {
    const old = [...board[r]];
    const rev = [...old].reverse();
    const { line, gained } = slideAndMergeLine(rev);
    const newLine = line.reverse();
    board[r] = newLine;
    score += gained;
    if (!arraysEqual(old, newLine)) moved = true;
  }
  return moved;
}

function getCol(c) { return board.map(row => row[c]); }

function setCol(c, col) {
  for (let r = 0; r < SIZE; r++) board[r][c] = col[r];
}

function moveUp() {
  let moved = false;
  for (let c = 0; c < SIZE; c++) {
    const old = getCol(c);
    const { line, gained } = slideAndMergeLine(old);
    setCol(c, line);
    score += gained;
    if (!arraysEqual(old, line)) moved = true;
  }
  return moved;
}

function moveDown() {
  let moved = false;
  for (let c = 0; c < SIZE; c++) {
    const old = getCol(c);
    const rev = [...old].reverse();
    const { line, gained } = slideAndMergeLine(rev);
    const newCol = line.reverse();
    setCol(c, newCol);
    score += gained;
    if (!arraysEqual(old, newCol)) moved = true;
  }
  return moved;
}

function canMove() {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return true;
    }
  }
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE - 1; c++) {
      if (board[r][c] === board[r][c + 1]) return true;
    }
  }
  for (let c = 0; c < SIZE; c++) {
    for (let r = 0; r < SIZE - 1; r++) {
      if (board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
}

function showMask(title, text) {
  maskTitle.textContent = title;
  maskText.textContent = text;
  mask.classList.add('show');
}

function hideMask() { mask.classList.remove('show'); }

function afterMove(moved) {
  if (!moved || gameOver) return;
  addRandomTile();
  render();

  if (won) {
    won = false;
    showMask('你赢了！', '已合成 2048，继续挑战或重新开始。');
  }

  if (!canMove()) {
    gameOver = true;
    showMask('游戏结束', '棋盘已满且无法合并。');
  }
}

function handleMove(dir) {
  if (gameOver) return;
  let moved = false;
  if (dir === 'left') moved = moveLeft();
  if (dir === 'right') moved = moveRight();
  if (dir === 'up') moved = moveUp();
  if (dir === 'down') moved = moveDown();
  afterMove(moved);
}

/* keyboard */
window.addEventListener('keydown', (e) => {
  const map = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down'
  };
  if (map[e.key]) {
    e.preventDefault();
    handleMove(map[e.key]);
  }
});

/* touch */
let sx = 0, sy = 0, ex = 0, ey = 0;

boardWrap.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  sx = t.clientX; sy = t.clientY;
  ex = sx; ey = sy;
}, { passive: true });

boardWrap.addEventListener('touchmove', (e) => {
  const t = e.touches[0];
  ex = t.clientX; ey = t.clientY;
}, { passive: true });

boardWrap.addEventListener('touchend', () => {
  const dx = ex - sx;
  const dy = ey - sy;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  const threshold = 24;

  if (Math.max(absX, absY) < threshold) return;

  if (absX > absY) handleMove(dx > 0 ? 'right' : 'left');
  else handleMove(dy > 0 ? 'down' : 'up');

  sx = sy = ex = ey = 0;
});

/* buttons */
restartBtn.addEventListener('click', initBoard);
maskRestartBtn.addEventListener('click', initBoard);

themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));

/* init theme */
const savedTheme = localStorage.getItem('theme2048') || 'classic';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

/* init game */
initBoard();
