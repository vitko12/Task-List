//Select 
const taskInput = document.querySelector(".task-input");
const taskButton = document.querySelector(".task-button");
const taskList = document.querySelector(".task-list");
const filterOption = document.querySelector(".filter-task");

//Listeners
document.addEventListener("DOMContentLoaded", getTasks);
taskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
filterOption.addEventListener("click", filterTask);

//Functions

function addTask(e) {
  //Prevent natural behaviour
  e.preventDefault();
  //Create task div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  //Create list
  const newTask = document.createElement("li");
  newTask.innerText = taskInput.value;
  //Save to local
  saveLocalTasks(taskInput.value);
  //
  newTask.classList.add("task-item");
  taskDiv.appendChild(newTask);
  taskInput.value = "";
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  taskDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  taskDiv.appendChild(trashButton);
  //attach final Task
  taskList.appendChild(taskDiv);
}

function deleteTask(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const task = item.parentElement;
    task.classList.add("fall");
    //at the end
    removeLocalTasks(task);
    task.addEventListener("transitionend", e => {
      task.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const task = item.parentElement;
    task.classList.toggle("completed");
    console.log(task);
  }
}

function filterTask(e) {
  const tasks = taskList.childNodes;
  tasks.forEach(function(task) {
    switch (e.target.value) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
    }
  });
}

function saveLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(taskButton) {
    //Create task div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //Create list
    const newTask = document.createElement("li");
    newTask.innerText = task;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);
    taskInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    taskDiv.appendChild(trashButton);
    //attach final Task
    taskList.appendChild(taskDiv);
  });
}