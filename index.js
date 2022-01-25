class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    validateBook(book) {
        if (book.name.length < 3 || book.author.length < 3) {
            return false
        }

        return true;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    addBook(book) {
        let string = `<tr>
                        <td class='srch'>${book.name}</td>
                        <td class='srch'>${book.author}</td>
                        <td class='srch'>${book.type}</td>
                        <td><button class="delBtn">Delete</button></td>
                    </tr>`;

        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML += string;
    }

    message(type, displayMessage) {
        let mess = document.getElementById('message');
        mess.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>Message!</strong> ${displayMessage}.
            </div>`

        setTimeout(() => {
            mess.innerHTML = ""
        }, 2000);
    }
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You Have Successfully Submit the form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type = document.querySelector("input[name='type']:checked").value;

    let bookName = new Book(name, author, type);
    let display = new Display();
    if (display.validateBook(bookName)) {
        display.addBook(bookName);
        display.clear();
        display.message('success', 'Your Book Has Been Successfully added')
        let delBtn = document.getElementsByClassName('delBtn');
        for (const btn of delBtn) {
            btn.addEventListener('click', (e) => {
                console.log(btn);
                e.target.parentElement.parentElement.remove();
            })
        }
    }
    else {
        display.message('danger', 'You cannot add this book')
    }
    e.preventDefault();
}


let search = document.getElementById('search');
search.addEventListener('input', ()=>{
    // console.log(seDarch.value);
    let searchText = search.value.toLowerCase();
    let tableBody = document.getElementById('tableBody');
    let tr = tableBody.getElementsByTagName('td');
    console.log(tr)
    for (const data of tr) {
        cardText = data.innerText.toLowerCase();
        console.log(cardText);
        if (cardText.includes(searchText)) {
            data.parentElement.classList.toggle('show');
            console.log(data.parentElement);
        }
        else{
            data.parentElement.setAttribute('class', 'notShow');
        }
    }

})