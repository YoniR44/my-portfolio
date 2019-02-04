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
        <th scope="col" onclick="sortById(gBooks)" class="title-sort">Id</th>
        <th scope="col">Image</th>
        <th scope="col" onclick="sortByName(gBooks)" class="title-sort">Title</th>
        <th scope="col" onclick="sortByPrice(gBooks)" class="title-sort">Price</th>
        <th scope="col">Actions</th>
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
            <button type="button" class="btn btn-primary" onclick="onReadBook('${book.id}')">Read</button>
            <button type="button" class="btn btn-warning" onclick="readAndUpdateBook('${book.id}')">Update</button>
            <button type="button" class="btn btn-danger" onclick="onDeleteBook('${book.id}')">Delete</button>
            </td>
          </tr>`
    })
    strHTML += strHTMLBody.join('');
    strHTML += `</tbody>
    </table>`
    $('.books-container').html(strHTML);
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
    updateBook(bookId, newPrice);
    if (gUpdate) gUpdate = false;
    else {
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

function addRating() {
    if (elRating === 10) return;
    else {
        elRating++;
        document.querySelector('.rate-up').innerText = elRating;
    }
}

function decreaseRating() {
    if (elRating === 0) return;
    else {
        elRating--;
        document.querySelector('.rate-down').innerText = elRating;
    }
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