console.log('Create note as much as you want to')
showNotes();

var add_note = document.getElementById('add_note');
var note_title_input = document.getElementById('note_title');
var note_body_input = document.getElementById('note_body');

var notes_container = document.getElementById('notes_container');
var my_note_title = document.getElementById('note_head');
var saved_note = document.getElementById('saved_note');
var del_note = document.getElementById('del_ntoe')

var srchNotes = document.getElementById('srchNotes');
var snackbar = document.getElementById('snackbar');
var snackbar_cross = document.getElementById('cross');
var modal_boxes = document.getElementById('modal_boxes');

let myNotesObj_body;


// When clicked in Create button
add_note.addEventListener('click', function(e) {
    let myNotesObj_title;
    let myNotesObj_body;
    let notes = localStorage.getItem('notes');
    let notes_title = localStorage.getItem('notes_title');
    if (notes == null && notes_title == null) {
        myNotesObj_title = [];
        myNotesObj_body = [];
    } else {
        myNotesObj_title = JSON.parse(notes_title);
        myNotesObj_body = JSON.parse(notes);
    }
    if (note_body_input.value.length != 0 && note_title_input.value.length != 0) {
        myNotesObj_title.push(note_title_input.value);
        myNotesObj_body.push(note_body_input.value);
        localStorage.setItem('notes', JSON.stringify(myNotesObj_body));
        localStorage.setItem('notes_title', JSON.stringify(myNotesObj_title));
        note_title_input.value = "";
        note_body_input.value = "";
    } else {
        snackbar.style.display = 'block';
        setTimeout(() => {
            snackbar.style.display = 'none';
        }, 3200);
    }
    showNotes();
})

function showNotes() {
    let myNotesObj_body;
    let myNotesObj_title;
    let notes = localStorage.getItem('notes');
    let notes_title = localStorage.getItem('notes_title');
    if (notes == null && notes_title == null) {
        myNotesObj_title = [];
        myNotesObj_body = [];
    } else {
        myNotesObj_title = JSON.parse(notes_title);
        myNotesObj_body = JSON.parse(notes);
    }

    let html = "";
    myNotesObj_body.forEach(function(element, index) {
        let title = JSON.parse(localStorage.notes_title);
        let monthsArr = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'Ocotober', 'November', 'December'];
        let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thrusday', 'Friday', 'Saturday']
        html += ` <div class="note">

        <details id="my_note1" class="my_note1">
            <summary id="note_head" class="note_head">${title[index]}</summary>
            <p id="saved_note" class="saved_note">${element}</p>
            <button id="${index}" class="del_note" onclick="delNote(this.id)">Delete</button>
            <button class="edit_note ${index}">Edit</button>
            <p class="created_time" id="created_time">Created on :<span> ${monthsArr[new Date().getMonth()]} ${new Date().getDate()} <br>${dayArr[new Date().getDay()] }, ${new Date().getFullYear()}</p>


        </details>
    </div>`
    });
    if (myNotesObj_body.length == 0) {
        document.getElementById('notes_container').innerHTML = `<p style = "font-family: 'Poppins', sans-serif; color: #888;"> Nothing to show here! Click "Add note" to create a note.</p>`
    } else {
        document.getElementById('notes_container').innerHTML = html;
    }
}



// When clicked on the cross button of the snackbar

snackbar_cross.addEventListener('click', function() {
    snackbar.style.display = "none";
})

// When click in Delete Note button
var modal_delNote = document.getElementById('modal_delNote');


function delNote(index) {
    modal_boxes.style.display = "block";
    modal_boxes.style.display = "flex";
    modal_delNote.style.display = "block";
    window.ind = index;
}

var nDel = document.getElementById('N_delNote_btn');
var yDel = document.getElementById('Y_delNote_btn');

nDel.addEventListener('click', function() {
    modal_boxes.style.display = "none";
    modal_delNote.style.display = "none";
})

yDel.addEventListener('click', function() {
    let myNotesObj_title;
    let myNotesObj_body;
    let notes = localStorage.getItem('notes');
    let notes_title = localStorage.getItem('notes_title');
    if (notes == null && notes_title == null) {
        myNotesObj_title = [];
        myNotesObj_body = [];
    } else {
        myNotesObj_title = JSON.parse(notes_title);
        myNotesObj_body = JSON.parse(notes);

    }
    myNotesObj_body.splice(window.ind, 1);
    myNotesObj_title.splice(window.ind, 1);
    localStorage.setItem('notes_title', JSON.stringify(myNotesObj_title));
    localStorage.setItem('notes', JSON.stringify(myNotesObj_body));
    modal_boxes.style.display = "none";
    modal_delNote.style.display = "none";

    showNotes();
})

// When note is edited || clicked on edit
const edit_btn = document.querySelectorAll('.edit_note');

for (item of edit_btn) {

    item.addEventListener('click', (e) => {
        let note_title = e.target.parentNode.children[0].innerText;
        let note_body = e.target.parentNode.children[1].innerText
        note_title_input.value = note_title;
        note_body_input.value = note_body;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.getElementById('notes_writing_area').style.animation = 'glow .8s';

        document.getElementById('buttons').children[0].style.display = "none";
        document.getElementById('buttons').children[1].style.display = "none";
        document.getElementById('buttons').children[2].style.display = "none";
        document.getElementById('buttons').children[3].style.display = "inline-block";
        document.getElementById('buttons').children[4].style.display = "inline-block";

        window.saveInd = e.target.parentNode.children[2].id;






    })
}

// When clicked on save button || Save note

document.getElementById('saveNote').addEventListener('click', (e) => {
    let myNotesObj_title;
    let myNotesObj_body;
    let notes = localStorage.getItem('notes');
    let notes_title = localStorage.getItem('notes_title');
    if (notes == null && notes_title == null) {
        myNotesObj_title = [];
        myNotesObj_body = [];
    } else {
        myNotesObj_title = JSON.parse(notes_title);
        myNotesObj_body = JSON.parse(notes);

    }
    if (note_body_input.value.length != 0 && note_title_input.value.length != 0) {
        myNotesObj_title.splice(window.saveInd, 1);
        myNotesObj_body.splice(window.saveInd, 1);
        myNotesObj_title.push(note_title_input.value);
        myNotesObj_body.push(note_body_input.value);
        localStorage.setItem('notes', JSON.stringify(myNotesObj_body));
        localStorage.setItem('notes_title', JSON.stringify(myNotesObj_title));
        note_title_input.value = "";
        note_body_input.value = "";


        document.getElementById('buttons').children[0].style.display = "inline-block";
        document.getElementById('buttons').children[1].style.display = "inline-block";
        document.getElementById('buttons').children[2].style.display = "inline-block";
        document.getElementById('buttons').children[3].style.display = "none";
        document.getElementById('buttons').children[4].style.display = "none";
    } else {
        snackbar.style.display = 'block';
        setTimeout(() => {
            snackbar.style.display = 'none';
        }, 3200);
    }
    showNotes();





})

// When clicked on cancel button || Cancel to save the note

document.getElementById('cancelSave').addEventListener('click', (e) => {
    document.getElementById('buttons').children[0].style.display = "inline-block";
    document.getElementById('buttons').children[1].style.display = "inline-block";
    document.getElementById('buttons').children[2].style.display = "inline-block";
    document.getElementById('buttons').children[3].style.display = "none";
    document.getElementById('buttons').children[4].style.display = "none";

    note_body_input.value = "";
    note_title_input.value = "";
})





// When note is searched
document.getElementById('srchNotes').addEventListener('input', function() {
    let inputVal = srchNotes.value.toLowerCase();
    let noteDiv = document.getElementsByClassName('note');

    Array.from(noteDiv).forEach(function(element, index) {
        let noteTxt_title = element.getElementsByTagName('summary')[0].innerText.toLowerCase();
        let noteTxt_body = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if (noteTxt_title.includes(inputVal) || noteTxt_body.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })

})



// When hoverout and clicked on the cross btn of modal box
var closeModal1 = document.getElementById('closeModal1');
closeModal1.addEventListener('mouseleave', function() {
    closeModal1.style.animation = "hoverOut 1s";
    setTimeout(() => {
        closeModal1.style.animation = "";
    }, 1000);
})

closeModal1.addEventListener('click', function() {
    modal_boxes.style.display = "none";
    modal_delNote.style.display = "none";
    modal_delAllNotes.style.display = "none";
})

var closeModal2 = document.getElementById('closeModal2');
closeModal2.addEventListener('mouseleave', function() {
    closeModal2.style.animation = "hoverOut 1s";
    setTimeout(() => {
        closeModal2.style.animation = "";
    }, 1000);
})

closeModal2.addEventListener('click', function() {
    modal_boxes.style.display = "none";
    modal_delNote.style.display = "none";
    modal_delAllNotes.style.display = "none";
})


// To clear the textArea

document.getElementById('clearArea').addEventListener('click', function() {
    note_title_input.value = "";
    note_body_input.value = "";
})

// To delete all notes
var modal_delAllNotes = document.getElementById('modal_delAllNotes');
var N_delAllNotes_btn = document.getElementById("N_delAllNotes_btn");
var Y_delAllNotes_btn = document.getElementById('Y_delAllNotes_btn');
document.getElementById('delAllNotes').addEventListener('click', function() {
    modal_boxes.style.display = "block";
    modal_boxes.style.display = "flex";
    modal_delAllNotes.style.display = "block";
})

N_delAllNotes_btn.addEventListener('click', function() {
    modal_boxes.style.display = "none";
    modal_delAllNotes.style.display = "none";
})

Y_delAllNotes_btn.addEventListener('click', function() {
    localStorage.clear();
    document.getElementById('notes_container').innerHTML = `<p style = "font-family: 'Poppins', sans-serif; color: #888;"> Nothing to show here! Click "Add note" to create a note.</p>`
    modal_boxes.style.display = "none";
    modal_delAllNotes.style.display = "none";
    note_title_input.value = "";
    note_body_input.value = "";
})