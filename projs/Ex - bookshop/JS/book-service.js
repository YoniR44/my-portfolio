'use strict';

const PAGE_SIZE = 3;

var gBooks;
var elRating = document.querySelector('.rate-up').innerText;
var currPageIdx = 0;
var gUpdate = true;
var gAddUpdate = true;

function createBooks() {
    var books = [];
    // var img = URL('img/hp.jpg');
    books.push(createBook('Harry Potter 1', 130, 'img/img1.jpg'));
    books.push(createBook('Harry Potter 2', 110, 'img/img2.jpg'));
    books.push(createBook('Harry Potter 3', 120, 'img/img3.jpg'));
    books.push(createBook('Harry Potter 4', 140, 'img/img4.jpg'));
    books.push(createBook('Harry Potter 5', 90, 'img/img5.jpg'));
    books.push(createBook('Harry Potter 6', 60, 'img/img6.jpg'));
    books.push(createBook('Harry Potter 7', 150, 'img/img7.jpg'));

    return books;
}

function createBook(name, price, imgUrl) {
    return {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: imgUrl
    }
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {    
        return bookId === book.id;
    });
    gBooks.splice(bookIdx, 1);
}

function addBook(name, price, imgUrl) {
    var book = createBook(name, price, imgUrl);
    gBooks.push(book);
}

function updateBook(bookId, bookPrice) {
    var bookIdx = gBooks.findIndex(function(book) {    
        return bookId === book.id;
    });
    gBooks[bookIdx].price = bookPrice;
}

function readBook(bookId) {
    var book = getBookById(bookId);
    var $modal = $('.modal');
    $modal.find('h5').text(book.name);
    $modal.find('.book-img').attr('src', book.imgUrl);
    $modal.find('p').text('Price: ' + book.price + '$');
    $modal.show();
}

function getBookById(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {    
        return bookId === book.id;
    });
    return gBooks[bookIdx];
}

function nextPage() {
    currPageIdx++;
}

function prevPage() {
    currPageIdx--;
}

function getBooks() {
    var fromIdx = currPageIdx * PAGE_SIZE;
    var books = gBooks.slice(fromIdx, fromIdx + PAGE_SIZE);
    return books;
}