'use strict';

var gProjs = [];

function createProject(id, name, title, desc, publishedAt, imgUrl, type, link) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        publishedAt: publishedAt,
        imgUrl: imgUrl,
        type: type,
        link: link,
    }
}

function createProjects() {
    gProjs.push(createProject('proj-mineSweeper', 'Minesweeper', 'Minesweeper Game', 
    'The old and classic minesweeper game with a new unique design',
    'Jan 24th, 2019', 'img/portfolio/01-full.jpg', 'Game', 'projs/Minesweeper/minesweeper.html'));
    gProjs.push(createProject('proj-library', 'Library organizer', 'Keep track of all your books information in one place', 
    'This application allows you to keep track of all the books, update prices, add/remove books and get other information about each book', 
    'February 3rd, 2019', 'img/portfolio/02-full.jpg', 'Database', 'projs/bookshop-international/bookshop.html'));
    gProjs.push(createProject('proj-chess', 'Chess', 'Play a game of chess', 'Play around with the chess pieces on the board',
    'Jan 21st, 2019', 'img/portfolio/03-full.jpg', 'Game', 'projs/Chess/chess-start-here/index.html'));
    gProjs.push(createProject('proj-touchNums', 'TouchNums', 'Touch the numbers by order',
    'Touch all the numbers by order starting from 1, see how fast you can get them all!', 'January 17th, 2019', 'img/portfolio/04-full.jpg', 'Game',
    'projs/touch-nums/touchNums.html'));
    gProjs.push(createProject('proj-trivia', 'Trivia Game', 'Can you get all the answers right?',
    'Short trivia game for the kids describe what you see in the picture and try to get them all right!',
    'January 17th, 2019', 'img/portfolio/05-full.jpg', 'Game', 'projs/in-picture/inPicture.html'));
    gProjs.push(createProject('proj-pacman', 'Pacman', 'Basic Pacman game',
    'Pacman game - eat the cookies, avoid the ghosts, Pizza gives you the power to get the ghosts, cherries give you bonus points', 
    'Jan 22nd, 2019', 'img/portfolio/06-full.jpg', 'Game', 'projs/pacman - starter/index.html'));
    
}

function getProjById(projId) {
    var projIdx = gProjs.findIndex(function(proj) {    
        return projId === proj.id;
    });
    return gProjs[projIdx];
}