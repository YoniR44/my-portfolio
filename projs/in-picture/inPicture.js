'use strict';

// ---------------------------------------------------------------------------------------------------
// Here are the global variables
var gQuests = [{ id: 1, opts: ["The dog is running", "The cat is running", "The dog is rolling"],
                 correctOptIndex: 0},
               { id: 2, opts: ["The kids are playing Baseball", "The kids are playing Hokey",
                               "The kids are playing Basketball"], correctOptIndex: 2},
               { id: 3, opts: ["The Fireman is a Seagul", "The Fireman is a Dalmation",
                               "The Fireman is a Possum"], correctOptIndex: 1}];
var gCurrQuestIdx = 0;

// ---------------------------------------------------------------------------------------------------
//Here are the game functions

function initGame() {
    renderQuest(gCurrQuestIdx);
}

// creates the question and answer board
function renderQuest(qstnNum) {
    var strHTML = `<img src="image-${qstnNum + 1}.jpg" class="image">`;
    for (var i = 0; i < gQuests[qstnNum].opts.length; i++) {
        strHTML += '<tr>';
        var item = gQuests[qstnNum].opts[i];
        strHTML +=
            `<td onclick="checkAnswer(${i})">${item}</td>`;
        strHTML += '</tr>';
    }
    var elQuest = document.querySelector('.questions-wrapper');
    elQuest.innerHTML = strHTML;
}

// checks if correct answer was clicked, if it is goes to next question.
function checkAnswer(optIdx) {
    if (optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
        gCurrQuestIdx++;
        // all questions were answered right
        if (gCurrQuestIdx > 2) {
            console.log('You win');
            var header = document.querySelector('h2');
            header.style.display = "block";
            return;
        }
        renderQuest(gCurrQuestIdx);
    } else {
        console.log('wrong answer');    
    }           
}