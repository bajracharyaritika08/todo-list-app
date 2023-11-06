const taskInput = document.querySelector(".task-input input")
const filters = document.querySelector(".filters span"),
taskBox = document.querySelector(".task-box");
const searchTodos = document.querySelector(".search_bar");
const onComplete = document.querySelector("#completed");
const pending = document.querySelector("#pending");
const alltodos = document.querySelector("#all");
const taskInfo = document.getElementById("task_info");
const sortBtn = document.getElementById("sort_btn");
const clearAll = document.getElementById("clear_btn")
//Getting Localstorage with key todo-list
let todos =JSON.parse(localStorage.getItem("todo-list"));
// console.log("LOCAL SAVED TODOS", todos, " Search TODOs", searchTodos)
const searchInput=()=>{
  searchTodos.addEventListener("input", ()=>{
    const inputedData = searchTodos.value;
    // console.log("TYPE OF" , inputedData.toLowerCase() )
    if(todos){
      const filteredData = todos.filter((item)=>{
        return(
          item?.todoName?.toLowerCase().match(inputedData?.toLowerCase())
          )  
        });  
        // temp.unshift(filteredData);
        showToDo(filteredData);
        // console.log("filtered DATAA", filteredData.length, "TODOS TODONAME", todos[0].todoName.toLowerCase())
      }  
    })  
  }  
  searchInput();

  // Sorting 
  const sortingToDo =()=>{
    sortBtn.addEventListener("click",()=>{
      if(todos){
        todos.sort((a,b)=>{
          const todoA = a.todoName.toLowerCase();
          const todoB = b.todoName.toLowerCase()
          if (todoA < todoB) return -1;
          if (todoA > todoB) return 1;
          return 0;
        });
        showToDo(todos);
      };
    });
  };
  sortingToDo();


  // Deleting All Todos
  const removeToDos=() => {
    clearAll.addEventListener("click",()=>{
      if (confirm("Are you sure you want to delete all the tasks?")) {
        alert("Deleted Successfully!");
        // Filtering out the task to be deleted and create a new array without it.
        todos = [];
        // Update the local storage with the modified todos
        localStorage.setItem("todo-list", JSON.stringify(todos));
        // Then render the updated todos
        showToDo(todos);
      }

    })
};
removeToDos();


// ALL TODOS
const allToDos=()=>{
  alltodos.onclick =()=>{
    taskInfo.textContent= "All Tasks"
    showToDo(todos);
  };  
};  
allToDos();


//Completed TODOS
const completedToDos = () => {
 // Replace "onComplete" with the actual ID of your button 
  onComplete.onclick = () => {
    taskInfo.textContent= "All Completed Task(s)"
    // console.log("ON CLICK");
    // Assuming you have a "todos" array defined somewhere in your code
    const completedFilteredData = todos.filter((item) => {
      return item?.status === "completed";
    });  
    showToDo(completedFilteredData);
    // console.log("Completed TOO", completedFilteredData);
  };  
};  
completedToDos();


// Pending todos
const pendingToDos=()=>{
  pending.onclick=()=>{
    taskInfo.textContent= "All Pending Task(s)"
    const pendingFilteredData = todos.filter((item) => {
      return item?.status === "pending";
    });  
    showToDo(pendingFilteredData);
    // console.log("Completed TOO", pendingFilteredData);
  };  
};  
pendingToDos();


//Declaring varibles for editing task
let editId;
//is false when page is loaded.
let isEditedTask = false;
//todoList is an empty array, it holds filtered data or todos
const showToDo=(todoList=[])=>{
  //Initally list haru empty hunxa
  console.log("FFF", todoList)
  let li = "";
  if(todoList){
    console.log("todoList LENGTH", todoList)
    todoList.forEach((todo,id)=>{
      // If todo status is completed, setting the isCompleted's value to checked.
      let isCompleted = todo.status == "completed" ? "checked" : "";
      // console.log("TODO", todo)
      li += `<li class="task">
              <label for="${id}">
                <input type="checkbox" onclick="updateStatus(this)" id="${id}" ${isCompleted} class="check_box">
                <p class="${isCompleted}">${todo.todoName}</p>
              </label>  
              <div class="setting">
                <i class="uil uil-ellipis-h"></i>
                <ul class="task-menu">
                  <li onclick="editTask(${id}, '${todo.todoName}')"><button class="editbtn">Edit</button></li>
                  <li onclick="deleteTask(${id})"><button class="deletebtn">Delete</button></li>
                </ul>  
              </div>  
            </li>`  
    });        
  }  
  taskBox.innerHTML= li || `Nothing's here!`;
}  
showToDo(todos);


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


//EDITING THE TASKS
const editTask=(taskId, taskName)=>{
  // console.log("TASK NAME SELECTED IS:", taskName)
  isEditedTask = true;
  editId = taskId;
  taskInput.value = taskName;
}  


//DELETING THE TASKS
const deleteTask=(deleteId)=>{
  // console.log("DELETED TASK ID IS:", deleteId)
  //Here, splice is used to remove the data deleteId means the id that is selected and 1 means the number of elements to be deleted.
  if(confirm("Do yo want to delete?")){
    todos.splice(deleteId, 1);
    alert("Deleted Successfully!");
    //Once it is deleted, setting it in local storage.
    localStorage.setItem("todo-list", JSON.stringify(todos));
    //and then rendering it.
    showToDo(todos);
  }
}  


//KEY EVENT (ENTER)
taskInput.addEventListener("keyup", e =>{
  let userTask = taskInput.value.trim();
  if(e.key =="Enter" && userTask){
    if(!isEditedTask){
      if(!todos){ //if todos xaina vane xai empty array pass gardinay.
        todos=[];
      }  
      let taskInfo = {todoName: userTask ,status:"pending"}
      //once we get the value entered by the use we push it to the empty array.
      todos.push(taskInfo);
    }else{
      //else local ma vako todos ma 
      isEditedTask = false;
      todos[editId].todoName = userTask;
    }  
    taskInput.value="";
    localStorage.setItem("todo-list", JSON.stringify(todos))
    showToDo(todos);
  }  
});  

