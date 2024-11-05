
document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks=JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task));
        updateTasksList();
        updateStats();
    }
})
let tasks = [];

const saveTasks=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}



const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = ""; // Clear input after adding
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value=tasks[index].text;
    tasks.splice(index,1);
    updateTasksList();
    saveTasks();
};
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter(task => task.completed).length;
  //const totalTasks = tasks.length;
  //const progress = (completeTasks/totalTasks)*100;
  //const progressBar = document.getElementById('progress');
  document.getElementById("numbers").textContent = `${completedTasks} / ${tasks.length}`;
  const progress = document.getElementById("progress");
  progress.style.width = tasks.length ? `${(completedTasks / tasks.length) * 100}%` : "0%";
};

const updateTasksList = () => {
  const task_list = document.getElementById("task_list");
  task_list.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "taskItem";
    listItem.innerHTML = `
      <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" data-index="${index}" ${task.completed ? "checked" : ""}/>
        <p>${task.text}</p>
      </div>
      <div class="icons">
        <img src="edit.png" alt="Edit" onClick="editTask(${index})" />
        <img src="bin.png" alt="Delete" onClick="deleteTask(${index})" />
      </div>
    `;
    listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
    task_list.append(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
