const todoForm = document.getElementById('todoForm')
const inputValue = document.getElementById('todo')
const addBtn = document.getElementById('addBtn')
const todoDiv = document.getElementById('todoDiv')
const todoGroup = document.getElementById('todoGroup')
const finishTodoGroup = document.getElementById('finishtodoGroup');
var todoPrice = 10;

eventListeners();

function eventListeners(){
    todoForm.addEventListener('submit',addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)

}

function addTodo(e){

    const newTodo = inputValue.value.trim();
    if(newTodo===""){
        alert("Todo giriniz..")
    }
    else{
        addToDoUI(newTodo);
        addTodoToStorage(newTodo);
    }

    e.preventDefault();
    
}


function addToDoUI(newTodo){
    const colors = ["#963484","#3066BE","#60AFFF","#28C2FF","#2AF5FF","#907fa4","#8e9775","#e1701a","#34656d","#a0937d","#334443","#344fa1","#04009a","#72147e","#cf0000"]
    const randomColor = Math.floor(Math.random()*colors.length)

    const li = document.createElement('li')
    const div = document.createElement('div')
    const divButtons = document.createElement('div')
    const successButton = document.createElement('button')
    const failButton = document.createElement('button')
    const iSuccess = document.createElement('i')
    const iFail = document.createElement('i')
    const todoP = document.createElement('p')

    todoP.innerText = newTodo
    todoP.classList = "fw-normal fs-4"
    iSuccess.classList = "fas fa-check-square fa-2x"
    iSuccess.style.color = "green"
    iFail.classList = "fas fa-trash-alt fa-2x ms-3"
    iFail.style.color = "red"
    divButtons.classList = "position-absolute bottom-0 end-0"
    divButtons.id="todo-content"
    div.classList = "ps-2 pt-3 pb-3 mb-3 todo-div"
    div.style.backgroundColor = colors[randomColor]
    successButton.classList = "success-btn todo-btn"
    successButton.type = "button"
    failButton.classList = "fail-btn todo-btn"
    failButton.type = "button"
    
    successButton.appendChild(iSuccess)
    failButton.appendChild(iFail)
    divButtons.appendChild(successButton)
    divButtons.appendChild(failButton)
    div.appendChild(todoP)
    div.appendChild(divButtons)
    li.appendChild(div)
    todoGroup.appendChild(li)
    inputValue.value = "";
    successButton.addEventListener('click',successMessage)
    failButton.addEventListener('click',deleteTodo)
}


function deleteTodo(e){
    e.target.parentElement.parentElement.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.parentElement.firstChild.innerText);
    console.log(e.target.parentElement.parentElement.parentElement.firstChild.innerText)
    e.preventDefault()
}

function successMessage(e){
    alert("Başarıyla tamamlandı. 10 puan kazandın.")
    e.target.parentElement.parentElement.parentElement.parentElement.remove();
    const count = document.getElementById('count');
    count.innerText = todoPrice;
    todoPrice += 10
    e.preventDefault()
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); 
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos)); 
}

function getTodosFromStorage(){

    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
 
 }

function loadAllTodosToUI(e){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addToDoUI(todo);
    });
}