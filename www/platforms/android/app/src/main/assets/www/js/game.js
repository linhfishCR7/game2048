const container = document.getElementById("game-container");
let board = Array(4).fill().map(() => Array(4).fill(0));

function drawBoard() {
  container.innerHTML = "";
  for (let row of board) {
    for (let val of row) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = val === 0 ? "" : val;
      container.appendChild(cell);
    }
  }
}

function addRandomTile() {
  let empty = [];
  board.forEach((r, i) =>
    r.forEach((val, j) => {
      if (val === 0) empty.push([i, j]);
    })
  );
  if (empty.length === 0) return;
  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  board[i][j] = Math.random() < 0.9 ? 2 : 4;
}

function slide(row) {
  let arr = row.filter(val => val);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      arr[i + 1] = 0;
    }
  }
  return arr.filter(val => val).concat(Array(4 - arr.filter(val => val).length).fill(0));
}

function rotateBoard(clockwise = true) {
  const newBoard = Array(4).fill().map(() => Array(4).fill(0));
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      newBoard[j][3 - i] = clockwise ? board[i][j] : board[j][3 - i];
  board = newBoard;
}

function moveLeft() {
  board = board.map(slide);
}

function moveRight() {
  board = board.map(row => slide(row.reverse()).reverse());
}

function moveUp() {
  rotateBoard();
  moveLeft();
  rotateBoard(false);
}

function moveDown() {
  rotateBoard();
  moveRight();
  rotateBoard(false);
}

document.addEventListener("keydown", e => {
  const before = JSON.stringify(board);
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
  if (e.key === "ArrowUp") moveUp();
  if (e.key === "ArrowDown") moveDown();
  if (JSON.stringify(board) !== before) addRandomTile();
  drawBoard();
});

addRandomTile();
addRandomTile();
drawBoard();
