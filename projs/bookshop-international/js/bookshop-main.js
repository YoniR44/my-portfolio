'use strict';

function init() {
    gBooks = createBooks();
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = `<table class="table table-hover">
    <thead>
      <tr>
        <th data-trans="table-id" scope="col" onclick="sortById(gBooks)" class="title-sort">Id</th>
        <th scope="col" data-trans="table-image">Image</th>
        <th data-trans="table-title" scope="col" onclick="sortByName(gBooks)" class="title-sort">Title</th>
        <th scope="col" onclick="sortByPrice(gBooks)" class="title-sort" data-trans="table-price">Price</th>
        <th data-trans="table-actions" scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>`
    var strHTMLBody = books.map(function (book) {
        return `
          <tr>
            <th>${book.id}</th>
            <td> <img class="book-img" src="${book.imgUrl}" alt=""></td>
            <td>${book.name}</td>
            <td><input id="${book.id}" class="hide"></input>${book.price}$</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="onReadBook('${book.id}')" data-trans="read-btn">Read</button>
            <button type="button" class="btn btn-warning" onclick="readAndUpdateBook('${book.id}')"data-trans="update-btn">Update</button>
            <button type="button" class="btn btn-danger" onclick="onDeleteBook('${book.id}')" data-trans="delete-btn">Delete</button>
            </td>
          </tr>`
    })
    strHTML += strHTMLBody.join('');
    strHTML += `</tbody>
    </table>`
    $('.books-container').html(strHTML);
    doTrans();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function readAndAddNewBook() {
    $('.newBook-modal').toggle();
    var name = $(`input#title-input`).val();
    var price = $(`input#price-input`).val();
    var url = $(`input#image-input`).val();
    if (gAddUpdate) gAddUpdate = false;
    else if (!gAddUpdate && name) {
        gAddUpdate = true;
        addBook(name, price, url);
        renderBooks();
    }
}

function readAndUpdateBook(bookId) {
    $(`input#${bookId}`).toggle();
    var newPrice = $(`input#${bookId}`).val();
    if (gUpdate) gUpdate = false;
    else if(newPrice) {
        updateBook(bookId, newPrice);
        gUpdate = true;
        renderBooks();
    }
}

function onReadBook(bookId) {
    readBook(bookId);
}

function onCloseModal() {
    $('.modal').hide()
}

function onCloseModal2() {
    $('.newBook-modal').hide()
}

function updateRating(num) {
    var $modal = $('.modal');   
    var bookId = $modal.find('h6').text();
    var book = getBookById(bookId);
    if (book.rating === 0 && num === -1) return;
    if (book.rating === 10 && num === 1) return;
    book.rating += num;
    $modal.find('.rate-up').text(book.rating);    
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function sortById(books) {
    books.sort((book1, book2) => (book1.id > book2.id) ? 1 : -1 );
    renderBooks();
}

function sortByName(books) {
    books.sort((book1, book2) => (book1.name > book2.name) ? 1 : -1 );
    renderBooks();
}

function sortByPrice(books) {
    books.sort((book1, book2) => (book1.price > book2.price) ? 1 : -1 );
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    doTrans();
}