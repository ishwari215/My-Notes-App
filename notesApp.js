console.log("This is a notes app project");
showNotes();
//If user adds a note, add it to local storage.
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  let myObj = {
    Title: addTitle.value,
    Text : addTxt.value
  }
  notesArr.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  addTxt.value = "";
  addTitle.value = "";
  console.log(notesArr);

  showNotes();
});
//Function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  let html = "";
  notesArr.forEach(function (element, index) {
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${element.Title}</h5>
            <p class="card-text">${element.Text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>  `;
  });
  let notesElm = document.getElementById("notes");
  if (notesArr != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show here. Please add a note.`;
  }
}
//Function to delete a note
function deleteNote(index) {
  console.log("I am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  notesArr.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  showNotes();
}
//To search In the search bar
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
  let inputVal = searchTxt.value.toLowerCase();
  console.log("Input event fired", inputVal);

  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)){
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
