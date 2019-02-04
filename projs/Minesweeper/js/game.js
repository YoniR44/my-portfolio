'use strict';
// -------------------------------------------------------------------------------------------------
// Here are the constant variables

const BOMB = '&#128163;';
const FLAG = '&#128681;';
const EMPTY = ' ';

// -------------------------------------------------------------------------------------------------
// Here are the global variables

var gBoard; // the general game board
var gRands; // an array of the empty locations on the board
var gBombsLeft;
var gFirstClicked = true;
var gTimerInterval;
var gSize; // general board size
var gBombAmount; // how many bombs for the board size
var gGame = { isOn: true, shownCount: 0, markedCount: 0 };
var gHintsCount; // how many hints
var gIsHint = false; // changes to true when asked for hint
var gSec = 0;
// getting best scores from local storage
var gBestScoreEasy = localStorage.getItem('gBestScoreEasy');
var gBestScoreMedium = localStorage.getItem('gBestScoreMedium');
var gBestScoreHard = localStorage.getItem('gBestScoreHard');

var elCountBombs = document.querySelector('h3 .bombs span'); // where the bomb count appears on the screen
var elTimer = document.querySelector('.sidebar-wrapper .timer span');
var elBtn = document.querySelector('.btn'); // the smiley button that restarts game
var elHints = document.querySelector('.hints span'); // here we change the amount of hints left
var elHintButton = document.querySelector('.hints'); // the hint button - when clicked it turns blue indicating you can click a cell for hint
var elTopScores = document.querySelectorAll('.sidebar-wrapper span');

// -------------------------------------------------------------------------------------------------
// Functions

// the main game function
function init(size, bombCount) {
    newGameInitilizations(size, bombCount);
    // creates empty board
    gBoard = buildBoard(size);
    // creates an array of empty locations on the board
    gRands = emptyLocationArr(size);
    // places bombs on the board
    placeBombs(gBoard, bombCount);
    // writes in each cell without a bomb, how many neighbour bombs it has
    updateBombCounts(gBoard);
    // converts board to an html table
    renderBoard(gBoard);

    gBombsLeft = bombCount;
    elCountBombs.innerText = gBombsLeft;
}

// -------------------------------------------------------------------------------------------------
// The next functions are all of the initializations of the board

// initializes all the game variables needed for a new game
function newGameInitilizations(size, bombCount) {
    renderBestScores();
    elBtn.innerHTML = '😊';
    gSize = size;
    gBombAmount = bombCount;
    gFirstClicked = true;
    clearInterval(gTimerInterval);
    gGame.isOn = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gHintsCount = 3;
    elHints.innerText = gHintsCount;
    gSec = 0;
}

// builds the board
function buildBoard(size) {
    var board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            var cell = { isBomb: false, isFlagged: false, neighBombs: 0, isRevealed: false }
            board[i][j] = cell;
        }
    }
    return board;
}

// makes an array of the locations of all cells
function emptyLocationArr(size) {
    var board = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board.push({ i: i, j: j });
        }
    }
    return board;
}

// places bombs in random locations on board
function placeBombs(board, bombCount) {
    for (let i = 0; i < bombCount; i++) {
        var rand = getRandomIntInclusive(0, (gRands.length - 1));
        board[gRands[rand].i][gRands[rand].j].value = BOMB;
        board[gRands[rand].i][gRands[rand].j].isBomb = true;
        gRands.splice(rand, 1);
    }
}

// for each cell updates how many neighbours with bombs it has
function updateBombCounts(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            var location = { i: i, j: j };
            board[i][j].neighBombs = countNeighBombs(board, location);
            if (board[i][j].neighBombs === 0) board[i][j].neighBombs = EMPTY;
        }
    }
}

// counts how many bombs in the neighbour cells
function countNeighBombs(board, location) {
    var count = 0;
    for (let i = (location.i - 1); i <= (location.i + 1); i++) {
        for (let j = (location.j - 1); j <= (location.j + 1); j++) {
            if (i >= 0 && i < board.length && j >= 0 && j < board.length) {
                if (board[i][j].isBomb === true) count++;
            }
        }
    }
    if (board[location.i][location.j].isBomb === true) return (count - 1);
    else return count;
}

// renders board for html to see on screen
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            var idName = `class="hide" id="cell${i}-${j}"`;
            if (cell.isBomb) idName = `class="hide bomb" id="cell${i}-${j}"`;
            strHTML += `<td onmouseup="handleKey(event, ${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})" 
                        ${idName}> </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '';
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

// -------------------------------------------------------------------------------------------------

// runs checks for the clicked cell
function cellClicked(elCell, i, j) {
    // doesn't let you click when game isn't active i.e when you win or get a game over
    if (!gGame.isOn) return;

    // starting timer on first click
    if (gFirstClicked === true) {
        // makes sure first click is not a bomb
        while (gBoard[i][j].isBomb) {
            init(gSize, gBombAmount);
        }
        // starts running the timer
        timer();

        gFirstClicked = false;
    }

    // stops user from unmarking a flagged cell
    if (gBoard[i][j].isFlagged) return;

    // In the case a hint was requested
    if (gIsHint) {
        hints(i, j); // displays the hint in this location
        gIsHint = false;
        elHintButton.style.removeProperty('background-color');
        return;
    }

    // when clicked an empty cell opens an expansion
    if (gBoard[i][j].neighBombs === EMPTY && !gBoard[i][j].isBomb) expandShown(gBoard, i, j);
    else revealCell(gBoard, i, j);

    // finishes game when bomb is clicked
    if (gBoard[i][j].isBomb) {
        var elBombs = document.querySelectorAll('.bomb.hide');
        for (let k = 0; k < elBombs.length; k++) {
            elBombs[k].classList.remove('hide');
            elBombs[k].innerHTML = BOMB;
        }
        gameOver(gBoard);
    }
    isWin(); // checks if game was won
}

// changes/adds value to a cell
function renderCell(i, j, value) {
    var elCell = document.querySelector(`#cell${i}-${j}`);
    elCell.innerHTML = value;
}

// indicates loss - changes smiley button emoji, stops timer and stops game.
function gameOver(board) {
    console.log('game over!');
    elBtn.innerHTML = '💀';
    gGame.isOn = false;
    clearInterval(gTimerInterval);
}

// this is the function for when you right click the mouse to mark flag
function handleKey(event, i, j) {
    // if game is over stops you
    if (!gGame.isOn) return;
    // stops you from marking an already revealed cell
    if(gBoard[i][j].isRevealed) return;
    // right mouse button was clicked
    if (event.button === 2) {
        // if there was a flag remove it and update relevant counts - else place flag and update counts
        if (gBoard[i][j].isFlagged) {
            gBoard[i][j].isFlagged = false;
            renderCell(i, j, EMPTY);
            gBombsLeft++;
            gGame.markedCount--;
        } else {
            gBoard[i][j].isFlagged = true;
            // place a flag in cell
            renderCell(i, j, FLAG);
            gBombsLeft--;
            gGame.markedCount++;
        }
    }
    isWin(); // check if game was won
    elCountBombs.innerText = gBombsLeft; // updates how many bombs are left on screen
}

// runs the select menu - allowing you to choose game difficulty
function selectDifficulty() {
    var difficulty = document.querySelector('.difficulty');
    switch (difficulty.value) {
        case '1': init(4, 2); break;
        case '2': init(6, 5); break;
        case '3': init(8, 15); break;
        default: init(4, 2); break;
    }

}

// runs when empty button was clicked, opens expansion
function expandShown(board, i, j) {
    // reveals the cell that was clicked on the board
    revealCell(board, i, j);
    // gets location of clicked cell
    var cellI = i;
    var cellJ = j;
    // here is the expansion recursion function
    for (let k = cellI - 1; k <= cellI + 1; k++) {
        if (k < 0 || k >= board.length) continue;
        for (let l = cellJ - 1; l <= cellJ + 1; l++) {
            if (l < 0 || l >= board.length || (k === cellI && l === cellJ)) continue;
            var cell = board[k][l];
            if (cell.isBomb || cell.isRevealed) continue;
            revealCell(board, k, l);
            if (cell.neighBombs === EMPTY) expandShown(board, k, l);
        }
    }
}

// reveals the content of a cell on the screen
function revealCell(board, i, j) {
    // if cell is already revealed
    if (board[i][j].isRevealed) return;

    board[i][j].isRevealed = true; // updates that is revealed

    var elCell = document.querySelector(`#cell${i}-${j}`);
    // places bomb if bomb or number of neighbour bombs if not
    if (board[i][j].isBomb) elCell.innerHTML = BOMB;
    else elCell.innerHTML = board[i][j].neighBombs;
    gGame.shownCount++;

    // reveals cell on the board
    var cellId = '#cell' + i + '-' + j;
    var elCellId = document.querySelector(cellId);
    elCellId.classList.remove('hide');
}

// updates that a request for hint was given, changes hint button to blue as indicator
function getHint() {
    gIsHint = true;
    elHintButton.style.backgroundColor = 'lightblue';
}

// displays the hinted cells on board for a second
function hints(i, j) {
    // stops you if out of hints or updates how many hints left
    if (gHintsCount === 0) return;
    else gHintsCount--;
    // updates on the screen how many hints left
    elHints.innerText = gHintsCount;
    // an array of the cell locations that should be revealed for the hint
    var hintCells = [];
    // makes an array of the cell locations that need revealing
    for (let k = i - 1; k <= i + 1; k++) {
        if (k < 0 || k >= gBoard.length) continue;
        for (let l = j - 1; l <= j + 1; l++) {
            if (l < 0 || l >= gBoard.length) continue;
            if (!gBoard[k][l].isRevealed) hintCells.push({ i: k, j: l });
        }
    }
    // reveals those cells
    for (let m = 0; m < hintCells.length; m++) {
        revealCell(gBoard, hintCells[m].i, hintCells[m].j);
    }
    // unreveals them after 1 second
    setTimeout(function unreveal() {
        for (let m = 0; m < hintCells.length; m++) {
            gBoard[hintCells[m].i][hintCells[m].j].isRevealed = false;
            gGame.shownCount--;
            // updating on the screen
            var cellId = '#cell' + hintCells[m].i + '-' + hintCells[m].j;
            var elCell = document.querySelector(cellId);
            elCell.innerHTML = (gBoard[hintCells[m].i][hintCells[m].j].isFlagged) ? FLAG : EMPTY;
            elCell.classList.add('hide');
        }
    }, 1000)
}

// checks if the game was won
function isWin() {
    var cellsClickedCount = gGame.shownCount + gGame.markedCount;
    if (cellsClickedCount === (gSize * gSize) && (gGame.markedCount === gBombAmount)) {
        clearInterval(gTimerInterval);
        elBtn.innerHTML = '😎';
        getBestScore();
        gGame.isOn = false;
        return true;
    }
    return false;
}

// updates the timer
function timer() {

    gTimerInterval = setInterval(function () {
        gSec++;
        elTimer.innerText = gSec;
    }, 1000);
}

// gets random integer between min and max entered
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// checks for each level if the new score is the best score
function getBestScore() {
    if ((gBestScoreEasy === null || gSec < gBestScoreEasy) && gSize === 4) {
        gBestScoreEasy = gSec;
        localStorage.setItem('gBestScoreEasy', gBestScoreEasy);
    } else if ((gBestScoreMedium === null || gSec < gBestScoreMedium) && gSize === 6) {
        gBestScoreMedium = gSec;
        localStorage.setItem('gBestScoreMedium', gBestScoreMedium);
    } else if (gSize === 8 && (gSec < gBestScoreHard || gBestScoreHard === null)) {
        gBestScoreHard = gSec;
        localStorage.setItem('gBestScoreHard', gBestScoreHard);
    }
}

// uploads best scores on to screen
function renderBestScores() {
    if (gBestScoreEasy) elTopScores[0].innerText = gBestScoreEasy + ' sec';
    if (gBestScoreMedium) elTopScores[1].innerText = gBestScoreMedium + ' sec';
    if (gBestScoreHard) elTopScores[2].innerText = gBestScoreHard + ' sec';
}