"use strict";
// Variable para almacenar el jugador actual (X o O)
let currentPlayer = "X";
// Variable para determinar si el juego está activo o no
let gameActive = true;
// Estado del juego: tablero vacío al inicio
let gameState = ["", "", "", "", "", "", "", "", ""];
// Condiciones de victoria: las combinaciones ganadoras en el tablero
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// Función para colocar la marca (X o O) en una celda del tablero
function placeMarker(cell) {
  if (gameState[cell] === "" && gameActive) {
    gameState[cell] = currentPlayer;
    document.getElementsByClassName("cell")[cell].innerText = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayPlayerTurn();
  }
}
// Función para verificar si hay un ganador
function checkWin() {
  //recorre las condiciones ganadoras
  for (let i = 0; i < winningConditions.length; i++) {
    // obtiene los indices de la combinacion actual
    const [a, b, c] = winningConditions[i];
    //verifica si hay ganador
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      //actualiza el estado del juego si hay ganador
      gameActive = false;
      document.getElementById(
        "message"
      ).innerText = `${gameState[a]} ha ganado!`;
      highlightWinnerCells([a, b, c]);
    }
  }
}

function highlightWinnerCells(cellsToHighlight) {
  for (let cellIndex of cellsToHighlight) {
    document.getElementsByClassName("cell")[cellIndex].classList.add("winner");
  }
}

// Función para reiniciar el juego
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  //estado del juego: tablero vacío al inicio
  gameState = ["", "", "", "", "", "", "", "", ""];
  // Borrar mensaje de victoria
  document.getElementById("message").innerText = "";
  removeHighlight();
  displayPlayerTurn();
  // Borrar marcas en las celdas
  const cells = document.getElementsByClassName("cell");
  //limpia tablero
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
}
function removeHighlight() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("winner");
  }
}
function displayPlayerTurn() {
  const playerTurnMessage = document.getElementById("playerTurn");
  playerTurnMessage.innerText = `Turno de: ${currentPlayer}`;
}
