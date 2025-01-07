let inputBox = document.querySelector("#inputBox");
let addButton = document.querySelector("#addButton");
let allListItems = document.querySelector("#allListItems");

// Initialize an array to store tasks
let tasks = [];

// Save tasks to localStorage
function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Loading task from  localStorage
function loadTasks() {
  const savedData = localStorage.getItem("tasks");
  if (savedData) {
    tasks = JSON.parse(savedData); 
    renderTasks();
  }
}

// Render tasks to the DOM
function renderTasks() {
  allListItems.innerHTML = ""; 
  tasks.forEach((task) => {
    // Create a new list item for each task
    let eachListItem = document.createElement("div");
    eachListItem.classList.add("eachListItems", "mb-2", "px-3", "py-1");
    eachListItem.innerHTML = `
        <p ${task.isCompleted ? 'style="text-decoration: line-through;"' : ""}>
          ${task.title}
        </p>
        <div class="buttons">
            <p style="display: ${task.isCompleted ? "block" : "none"};">Completed</p>
            <button class="btn btn-outline-danger deleteButton">Remove</button>
            <button class="btn btn-outline-success completedButton">✔</button>
        </div>`;

    eachListItem
      .querySelector(".deleteButton")
      .addEventListener("click", () => handleDelete(task.id));

    eachListItem
      .querySelector(".completedButton")
      .addEventListener("click", () => handleCompleted(task.id));

    allListItems.appendChild(eachListItem);
  });
}

// Function to delete tasks 
function handleDelete(id) {
  tasks = tasks.filter((task) => task.id !== id); 
  saveData(); 
  renderTasks(); 
}

// Funcion to make tasks as completed or not 
function handleCompleted(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
    saveData();
    renderTasks(); 
  }
}

// Add new tasks
addButton.addEventListener("click", () => {
  if (inputBox.value.trim() === "") {
    alert("Please add some text");
    return;
  }

  const newTask = {
    id: Date.now(), 
    title: inputBox.value,
    isCompleted: false,
  };

  tasks.push(newTask); 
  saveData(); 
  renderTasks(); 

  inputBox.value = ""; 
});


loadTasks();