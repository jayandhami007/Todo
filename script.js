let inputBox = document.querySelector("#inputBox");
let addButton = document.querySelector("#addButton");
let allListItems = document.querySelector("#allListItems");

// Initialize an array to store tasks
let tasks = [];

// Save tasks to localStorage
function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedData = localStorage.getItem("tasks");
  if (savedData) {
    tasks = JSON.parse(savedData); // Parse the stored JSON string back into an array
    renderTasks();
  }
}

// Render tasks to the DOM
function renderTasks() {
  allListItems.innerHTML = ""; // Clear the list before rendering
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

    // Add event listener for delete button
    eachListItem
      .querySelector(".deleteButton")
      .addEventListener("click", () => handleDelete(task.id));

    // Add event listener for completed button
    eachListItem
      .querySelector(".completedButton")
      .addEventListener("click", () => handleCompleted(task.id));

    allListItems.appendChild(eachListItem);
  });
}

// Handle the deletion of tasks
function handleDelete(id) {
  tasks = tasks.filter((task) => task.id !== id); // Remove the task with the matching ID
  saveData(); // Update localStorage
  renderTasks(); // Re-render the tasks
}

// Handle marking tasks as completed
function handleCompleted(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted; // Toggle the isCompleted status
    saveData(); // Update localStorage
    renderTasks(); // Re-render the tasks
  }
}

// Add new tasks
addButton.addEventListener("click", () => {
  if (inputBox.value.trim() === "") {
    alert("Please add some text");
    return;
  }

  // Create a new task object
  const newTask = {
    id: Date.now(), // Unique ID based on timestamp
    title: inputBox.value,
    isCompleted: false,
  };

  tasks.push(newTask); // Add the new task to the array
  saveData(); // Save the updated tasks array to localStorage
  renderTasks(); // Re-render the tasks

  inputBox.value = ""; // Clear the input field
});

// Load tasks from localStorage when the page loads
loadTasks();
