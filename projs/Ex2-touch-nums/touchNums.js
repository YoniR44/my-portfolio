'use strict';

// -------------------------------------------------------------------------------
// Here the constant variables

const SMALL = 16;
const MEDIUM = 25;
const LARGE = 36;

// -------------------------------------------------------------------------------
// Here are the global variables

var gSize = SMALL;
var gBoard = [];
var gChosenNum = 1;
var elSpan = document.querySelector('.nextNum span');

// -------------------------------------------------------------------------------
// Here are the game functions

// resets board
function init() {
    gChosenNum = 1;
    printBoard();
}

// creates board - runs onload or when reset is clicked
function printBoard() {
    gBoard = createArr(gSize);
    var strHTML = '';
    var limit = Math.sqrt(gSize);
    for (var i = 0; i < limit; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < limit; j++) {
            var randIdx = getRandomInteger(0, gBoard.length);
            var int = gBoard.splice(randIdx, 1)[0];
            strHTML +=
                `<td onclick="cellClicked(${int},this)">
                ${int}    
                </td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

// runs checks for the clicked cell
function cellClicked(clickedNum, elCell) {
    // the right number was clicked
    if (clickedNum === gChosenNum) {
        gChosenNum++;
        elCell.classList.add('marked');
        elSpan.innerText = gChosenNum;

        // start of game
        if (clickedNum === 1) {
            startTimer();
        }

        // end of game
        if (clickedNum === gSize) {
            console.log('Win');
            var header = document.querySelector('h2');
            header.style.display = "block";
        }
    }
}

// starts game timer
function startTimer() {
    var miliSec = 0;
    var sec = 0;
    var elTime = document.querySelector('.timer span');
    setInterval(function () {
        miliSec += 1;
        if (gSize === (gChosenNum - 1) || gChosenNum === 1) {
            clearInterval();
            miliSec = 0;
            sec = 0;
            return;
        }
        if (miliSec === 100) {
            sec++;
            miliSec = 0;
        }
        elTime.innerText = sec + '.' + miliSec;
    }, 10);
}

// sets the board size
function setSize(num) {
    gSize = num;
    gChosenNum = 1;
    printBoard();
}

// ----------------------------------------------------------------------------------
// Here are general functions

// makes an array of numbers for randomizing
function createArr(size) {
    var mat = [];
    for (let i = 0; i < size; i++) {
        mat[i] = i + 1;
    }
    return mat;
}

// generates random integer between min and max
function getRandomInteger(min, max) {
    var random = min + Math.floor(Math.random() * (max - min));
    return random;
}