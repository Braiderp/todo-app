const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const completed = document.getElementById("completed");
const all = document.getElementById("all");
const uncompleted = document.getElementById("uncompleted");

document.addEventListener("DOMContentLoaded", getTodos);
completed.addEventListener("click", filterCategories);
all.addEventListener("click", filterCategories);
uncompleted.addEventListener("click", filterCategories);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('deleteCheck', deleteCheck);

function addToDo(evt){
    evt.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    saveLocalTodos(todoInput.value);
    todoInput.value ="";
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    //completed button
    const completedButton = document.createElement("button");
    completedButton.addEventListener("click", toggleCompleted);
    completedButton.innerHTML = "<i class='fas fa-check'/>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    // trash btn 
    const trashButton = document.createElement("button");
    trashButton.addEventListener("click", deleteCheck);
    trashButton.innerHTML = "<i class='fas fa-trash'/>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list 
    todoList.appendChild(todoDiv);
}

function deleteCheck(evt){
    const todo = this.parentElement;
    removeLocalTodos(todo);
    todo.classList.add("fall");
    todo.addEventListener('transitionend', () => {
        todo.remove();
    });

}
function toggleCompleted(evt){
    this.parentElement.classList.toggle('completed');
}

function filterCategories(){
    let category = this.id; 
    const todos = todoList.childNodes;
    console.log("this is category", category)
    todos.forEach(todo => {
        switch(category) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
        
    });
}

function saveLocalTodos(todo){
    // do i exists;
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos (){
    console.log("todos",localStorage.getItem("todos"));
    let todos;    
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        
        //completed button
        const completedButton = document.createElement("button");
        completedButton.addEventListener("click", toggleCompleted);
        completedButton.innerHTML = "<i class='fas fa-check'/>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        // trash btn 
        const trashButton = document.createElement("button");
        trashButton.addEventListener("click", deleteCheck);
        trashButton.innerHTML = "<i class='fas fa-trash'/>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        //append to list 
        todoList.appendChild(todoDiv); 
    });

}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}