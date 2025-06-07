const boxes = document.querySelectorAll(".box");
const gameInfo = document.getElementById("gameInfo");
const newGameBtn = document.getElementById("newGame");

let currentPlayer = "X";
let gameGrid = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningPositions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  
  [0, 4, 8], [2, 4, 6]              
];

function checkWin() {
  let winnerFound = false;

  for (let position of winningPositions) {
    const [a, b, c] = position;
    if (
      gameGrid[a] !== "" &&
      gameGrid[a] === gameGrid[b] &&
      gameGrid[b] === gameGrid[c]
    ) {
      [a, b, c].forEach(index => {
        boxes[index].classList.add("win");
        boxes[index].style.pointerEvents = "none";
      });
      gameInfo.textContent = `${gameGrid[a]} Wins! ✌️`;
      gameActive = false;
      newGameBtn.classList.add("active");
      winnerFound = true;
      break;
    }
  }

  if (!winnerFound && !gameGrid.includes("")) {
    gameInfo.textContent = "It's a Tie! 🤝";
    gameActive = false;
    newGameBtn.classList.add("active");
  }

  return winnerFound;
}



function aiMove() {
  if (!gameActive) return;
  const emptyIndexes = gameGrid
    .map((val, idx) => (val === "" ? idx : null))
    .filter(val => val !== null);

  if (emptyIndexes.length === 0) return;

  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  gameGrid[randomIndex] = "O";
  boxes[randomIndex].textContent = "O";
  boxes[randomIndex].style.pointerEvents = "none";
  currentPlayer = "X";
  gameInfo.textContent = "Your Turn (X) ☺️";
  checkWin();
}

function handleClick(index) {
  if (!gameActive || gameGrid[index] !== "") return;

  gameGrid[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;
  boxes[index].style.pointerEvents = "none";

  const won = checkWin();

  if (!won && gameGrid.includes("")) {
    currentPlayer = "O";
    gameInfo.textContent = "Thinking... 🤦‍♂️";
    setTimeout(aiMove, 200);
  }
}


boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});

newGameBtn.addEventListener("click", () => {
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.remove("win");
    box.style.pointerEvents = "auto";
  });
  gameInfo.textContent = "Your Turn (X)";
  newGameBtn.classList.remove("active");
});
