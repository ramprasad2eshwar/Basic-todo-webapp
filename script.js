let tasks=[];
const addTask = () =>{
    const taskInput = document.getElementById('taskInput');
    const text=taskInput.value.trim();
    if(text){
        tasks.push({text:text,completed:false});
        updateTasksList();
    }
    //console.log(tasks);
};

const toggleTaskComplete=(index)=>{
  tasks[index].completed=!tasks[index].completed;
  updateTasksList();
}

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
};


const updateTasksList = () =>{
    const task_list = document.getElementById('task_list');
    task_list.innerHTML="";
    tasks.forEach((task) =>{
        const listItem = document.createElement('li');
       listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "Completed" : ""}">
          <input type="checkbox" class="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="edit.png" onClick="editTask${index}">
          <img src="bin.png" onClick="deleteTask${index}">
        </div>
      </div>
    `;
    listItem.addEventListener("change",()=>toggleTaskComplete(index));
    task_list.append(listItem);
  });
};
document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();
    addTask();

});