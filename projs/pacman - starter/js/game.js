'use strict';
var WALL = '🌴';
var FOOD = '🍪';
var POWER_FOOD = '🍕'
var EMPTY = ' ';
var CHERRY = '&#127826;'

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};
var gCounterFood = 0;

var gEmptyCells = [];
var gIntervalCherry;

function init() {
  closeModal();
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gIntervalCherry = setInterval(addCherry, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = board[8][8] = board[1][8] = board[8][1] = POWER_FOOD;
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' 
      if (cell === PACMAN) {
        strHTML += PACMAN + ' </td>';
      }
      else strHTML += cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function gameOver(result) {
  console.log('Game Over');
  gGame.isOn = false;
  gGame.score = 0;
  gCounterFood = 0;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  gIntervalGhosts = 0;
  if (result === 'LOSS') openModal('LOSS');
  else openModal('WIN');
}

function addCherry() {
  if (gEmptyCells.length === 0) return;
  var idx = getRandomIntInclusive(0, (gEmptyCells.length - 1));
  renderCell(gEmptyCells[idx] , CHERRY);
  gBoard[gEmptyCells[idx].i][gEmptyCells[idx].j] = CHERRY;
  gEmptyCells.splice(idx, 1);
  
}