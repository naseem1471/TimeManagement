const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");
// Create a variable to store the array of tasks
let tasksArray = [];

// Get the tasks from local storage if they exist
let savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  // Parse the string to an array
  tasksArray = JSON.parse(savedTasks); // Assign the data to the tasksArray
  // Display the tasks on the list
  tasksArray.forEach(task => {
    tasks.innerHTML += `<li>
                          <span>${task}</span>
                          <i class="bi bi-trash-fill delete"></i>
                        </li>`;
  });
}

function updateMessage() {
  const textLength = tasks.children.length;
  messageSpan.textContent = `You have ${textLength} pending tasks.`;
}
updateMessage();

addForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = addForm.task.value.trim();

  if (value.length) {
    tasks.innerHTML += `<li>
                          <span>${value}</span>
                          <i class="bi bi-trash-fill delete"></i>
                        </li>`;
    addForm.reset();
    updateMessage();
    // Add the task to the array
    tasksArray.push(value);
    // Save the array to local storage as a string
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
});

tasks.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
      // Get the task's text content
      const taskText = event.target.previousElementSibling.textContent;
  
      // Find the index of the task in the array
      const index = tasksArray.indexOf(taskText);
  
      if (index !== -1) {
        // Remove the task from the array
        tasksArray.splice(index, 1);
  
        // Save the updated array to local storage
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
      }
  
      // Remove the task from the list
      event.target.parentElement.remove();
      updateMessage();
    }
  });

clearAll.addEventListener("click", event => {
  const taskItems = tasks.querySelectorAll("li");
  taskItems.forEach(item => {
    item.remove();
  });
  updateMessage();
  // Clear the array of tasks
  tasksArray = [];
  // Clear the local storage
  localStorage.clear();
});

function filterTask(term) {
  Array.from(tasks.children)
    .filter(task => !task.textContent.toLowerCase().includes(term))
    .forEach(task => task.classList.add("hide"));

  Array.from(tasks.children)
    .filter(task => task.textContent.toLowerCase().includes(term))
    .forEach(task => task.classList.remove("hide"));
}

searchForm.addEventListener("keyup", event => {
  const term = searchForm.task.value.trim().toLowerCase();
  filterTask(term);
});

searchForm.addEventListener("click", event => {
  if (event.target.classList.contains("reset")) {
    searchForm.reset();
    const term = searchForm.task.value.trim();
    filterTask(term);
  }
});
