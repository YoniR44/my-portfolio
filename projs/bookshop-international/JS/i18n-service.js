var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוך הבא לחנות הספרים שלי'
    },
    'new-book-btn': {
        en: 'Create new book',
        he: 'הוסף ספר חדש'
    },
    'new-book-modal': {
        en: 'Enter new book details',
        he: 'הכנס את הפרטים של הספר החדש'
    },
    'new-book-title': {
        en: 'Book title:',
        he: 'שם הספר:'
    },
    'new-book-price': {
        en: 'Book price:',
        he: 'מחיר הספר:'
    },
    'new-book-image': {
        en: 'Book image:',
        he: 'תמונת הספר:'
    },
    'prev-page': {
        en: 'Previous page',
        he: 'עמוד קודם'
    },
    'next-page': {
        en: 'Next page',
        he: 'עמוד הבא'
    },
    'modal-title': {
        en: 'modal title',
        he: 'כותרת המודל'
    },
    'book-rating': {
        en: 'Book rating:',
        he: 'דירוג הספר:'
    },
    'close-modal': {
        en: 'Close',
        he: 'סגור'
    },
    'table-id': {
        en: 'id',
        he: 'מספר סידורי'
    },
    'table-image': {
        en: 'Image',
        he: 'תמונה'
    },
    'table-price': {
        en: 'price',
        he: 'מחיר'
    },
    'table-title': {
        en: 'title',
        he: 'שם הספר'
    },
    'table-actions': {
        en: 'actions',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'Read',
        he: 'מידע'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן מחיר'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'מחק'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}