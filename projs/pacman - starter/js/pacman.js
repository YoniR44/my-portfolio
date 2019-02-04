var PACMAN = '<img src="img/pacmanLeft.png">';

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;
  
  if (nextCell === POWER_FOOD && gPacman.isSuper === true) return;
  
  if (nextCell === CHERRY) {
    updateScore(10);
  }

  // Hitting FOOD? update score
  if (nextCell === FOOD || nextCell === POWER_FOOD) {
    gCounterFood++;
    updateScore(1);
    if (nextCell === POWER_FOOD) {
      gPacman.isSuper = true;
      var colors = []
      for (let i = 0; i < gGhosts.length; i++) {
        colors.push(gGhosts[i].color);
        gGhosts[i].color = '#0000CD';
      }
      setTimeout(function () {
        for (let i = 0; i < gGhosts.length; i++) {
          gGhosts[i].color = colors[i];
        }
        gPacman.isSuper = false;
      }, 5000);
    }
  }
  else if (nextCell === GHOST) {
    if (gPacman.isSuper === true) {
      for (let i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
          if (gGhosts[i].currCellContent === FOOD) gCounterFood++;
          gGhosts.splice(i, 1);
        }
      }
    } else {
      gameOver('LOSS');
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);
  gEmptyCells.push(gPacman.location);
  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
  if (gCounterFood === 60) {
    gameOver('WIN');
  }
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      PACMAN = '<img src="img/pacmanUp.png">';
      break;
    case 'ArrowDown':
      nextLocation.i++;
      PACMAN = '<img src="img/pacmanDown.png">';
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      PACMAN = '<img src="img/pacmanLeft.png">';
      break;
    case 'ArrowRight':
      nextLocation.j++;
      PACMAN = '<img src="img/pacmanRight.png">';
      break;
    default: return null;
  }
  return nextLocation;
}