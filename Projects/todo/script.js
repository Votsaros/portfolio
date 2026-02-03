const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if(task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRender();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index,1);
      saveAndRender();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if(text){
    tasks.push({text, completed:false});
    saveAndRender();
    taskInput.value = "";
  }
});

// Initial render
renderTasks();