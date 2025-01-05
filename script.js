let inputBox = document.querySelector("#inputBox");
let addButton = document.querySelector("#addButton");
let allListItems = document.querySelector("#allListItems");

// Function to save the list data to localStorage
function saveData() {
  localStorage.setItem("tasks", allListItems.innerHTML);
}

function loadTasks() {
  const savedData = localStorage.getItem("tasks");
  if (savedData) {
    allListItems.innerHTML = savedData;

    // Add event listeners for delete buttons on loaded items
    document.querySelectorAll(".deleteButton").forEach((deleteButton) => {
      deleteButton.addEventListener("click", handleDelete);
    });

    // Add event listeners for completed buttons on loaded items
    document.querySelectorAll(".completedButton").forEach((completedButton) => {
      completedButton.addEventListener("click", handleCompleted);
    });
  }
}

// Handle the deletion of tasks
function handleDelete(event) {
  const listItem = event.target.closest(".eachListItems");
  listItem.remove();
  saveData(); // Update localStorage after deleting
}

// Handle marking tasks as completed
function handleCompleted(event) {
  const buttonsDiv = event.target.closest(".buttons"); 
  const statusText = buttonsDiv.querySelector("p"); 
  statusText.style.display = "block"; 
}

// Add new tasks
addButton.addEventListener("click", () => {
  if (inputBox.value.trim() === "") {
    alert("Please add some text");
    return;
  }

  // Create a new list item
  let eachlistItem = document.createElement("div");
  eachlistItem.classList.add("eachListItems", "mb-2", "px-3", "py-1");
  eachlistItem.innerHTML = `
        <p>${inputBox.value}</p>
        <div class="buttons">
            <p>Completed</p>
            <button class="btn btn-outline-danger deleteButton">Remove</button>
            <button class="btn btn-outline-success completedButton">✔</button>
        </div>`;

  // Add event listener to the new delete button
  eachlistItem
    .querySelector(".deleteButton")
    .addEventListener("click", handleDelete);

  eachlistItem
    .querySelector(".completedButton")
    .addEventListener("click", handleCompleted);

  allListItems.appendChild(eachlistItem);

  inputBox.value = "";
  saveData();
});

// Load tasks from localStorage when the page loads
loadTasks();
