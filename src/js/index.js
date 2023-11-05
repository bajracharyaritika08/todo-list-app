const taskInput = document.querySelector(".task-input input"),
taskBox = document.querySelector(".task-box");
//Getting Localstorage with key todo-list
let todos =JSON.parse(localStorage.getItem("todo-list"));

const showToDo=()=>{
  //Initally list haru empty hunxa
  let li = "";
  if(todos){
    todos.forEach((todo,id)=>{
      // If todo status is completed, setting the isCompleted's value to checked.
      let isCompleted = todo.status == "completed" ? "checked" : "";
      // console.log("TODO", todo)
      li += `<li class="task">
              <label for="${id}">
                <input type="checkbox" onclick="updateStatus(this)" id="${id}" ${isCompleted}>
                <p class="${isCompleted}">${todo.todoName}</p>
              </label>
              <div class="setting">
                <i class="uil uil-ellipis-h"></i>
                <ul class="task-menu">
                  <li>Edit</li>
                  <li onclick="deleteTask(${id})">Delete</li>
                </ul>
              </div>
            </li>`
    });
  }
  taskBox.innerHTML= li;
}
showToDo();

//Update the status 
const updateStatus=(selectedTask)=>{
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked){
    //Adding the class name checked inorder to inline through it.
    taskName.classList.add("checked");
    // Updating the status if completed or not.
    todos[selectedTask.id].status="completed";
    
  }else{
    taskName.classList.remove("checked");
        // Updating the status to pending.
    todos[selectedTask.id].status="pending";
  }
  //Updating this accordingly in local storage
  localStorage.setItem("todo-list", JSON.stringify(todos))

}

//KEY EVENT (ENTER)
taskInput.addEventListener("keyup", e =>{
  let userTask = taskInput.value.trim();
  if(e.key =="Enter" && userTask){
    if(!todos){ //if todos xaina vane xai empty array pass gardinay.
      todos=[];
    }
    taskInput.value="";
    let taskInfo = {todoName: userTask ,status:"pending"}
    //once we get the value entered by the use we push it to the empty array.
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos))
    showToDo();
  }
});



