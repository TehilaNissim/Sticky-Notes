// Reference to the main app container
const notesContainer = document.getElementById("app");
// Reference to button that adds a note
const addNoteButton = notesContainer.querySelector(".add-note");

// when page first loads up, display notes to user
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.title, note.content);    // create note element
    notesContainer.insertBefore(noteElement, addNoteButton);    // place add note button last
});


addNoteButton.addEventListener("click", () => addNote());

// retrieves existing notes from local storage, returns array of notes
function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

//saves new notes to storage
function saveNotes(notes){
    // take the JS array of notes, turns them into strings
    // and then save to local storage key
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

//allows us to build a new element to represent a single note
function createNoteElement(id, title, content){
    // Create the main div element
    const noteBox = document.createElement("div");
    noteBox.className = "note-box";
    noteBox.classList.add("note-box"); //adds the CSS rules to element

    // Create the title textarea 
    const noteTitle = document.createElement("textarea");
    noteTitle.className = "note-title";
    noteTitle.classList.add("note-title"); //adds the CSS rules to element
    noteTitle.placeholder = "Enter title here";
    noteTitle.value = title;

    // Create the body textarea
    const noteBody = document.createElement("textarea");
    noteBody.className = "note-body";
    noteBody.classList.add("note-body");
    noteBody.placeholder = "Enter text";
    noteBody.value = content;

    // Append the textareas to the main div
    noteBox.appendChild(noteTitle);
    noteBox.appendChild(noteBody);

    // ***************** 

    // when the user makes a change in the note, save the change
    noteTitle.addEventListener("change", () => {
        updateNote(id, noteTitle.value, noteBody.value);
    });

    noteBody.addEventListener("change", () => {
        updateNote(id, noteTitle.value, noteBody.value);
    });

    // to delete note
    noteBox.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        if (doDelete){
            deleteNote(id, noteBox);
        }
    });

    return noteBox;
}

//adds note to html page and local storage
function addNote(){
    /*  Steps:
        1. get all existing notes
        2. make a new note
        3. combine & save as a new array
    */

    // reference to all existing notes
    const existingNotes = getNotes();
   
    // new note
    const noteObject = {
        id: Math.floor(Math.random() * 10000000),
        title: "", 
        content: ""
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.title, noteObject.content);
    // place add note button last
    notesContainer.insertBefore(noteElement, addNoteButton);

    //append new note to array
    existingNotes.push(noteObject);
    //save
    saveNotes(existingNotes);
}

//saves updated note
function updateNote(id, newTitle, newContent){
    // reference to all notes
    const notes = getNotes();
    // the desired note to update - go thru each notes 
    // if it has the id we're looking for, choose that note
    const targetNote = notes.filter(note => note.id == id)[0];
    // save new content in note
    targetNote.title = newTitle;
    targetNote.content = newContent;
    // save array of notes 
    saveNotes(notes);
}

//deletes note from page & local storage 
function deleteNote(id, element){
    // get all notes
    const notes = getNotes().filter(note => note.id != id);
    // save only the ones we wanna keep
    saveNotes(notes);
    // remove the element of the note we deleted so we don't see it on the html page
    notesContainer.removeChild(element);

}


/*
// a pop up will show up when button is clicked
function onButtonClick(){
    alert("Button clicked!")
    // make a new note
}

// Function to delete an item from the list
function deleteItem(index) {
    list.splice(index, 1);
    displayList();
  }

class Note{
    constructor(title="default title", body = "type notes here..."){
        this.title = title;
        this.body = body;
    }
    editTitle(){

    }
    editBody(){

    }
}

addNoteButton.addEventListener('click', onButtonClick);

// holds list of notes
let notesList = [];
const addNoteButton = document.getElementById('addNoteButton');

addNoteButton.addEventListener('click', addNote);

function addNote(){
    myNote = new Note();
    notesList.unshift(myNote);
}
*/
