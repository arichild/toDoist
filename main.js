const input = document.querySelector('.task');
const btnCreate = document.querySelector('.create');
const list = document.querySelector('.list-task');

document.addEventListener("DOMContentLoaded", getToDous);
btnCreate.addEventListener('click', createTask);
list.addEventListener('click', deleteToDo);

function createTask(e) {
    e.preventDefault();
  
    const inputValue = input.value;

    if (inputValue !== '') {
        const newDiv = document.createElement("div");
        newDiv.classList.add('toDo');
        list.append(newDiv);

        const newToDo = document.createElement("li");
        newToDo.classList.add('list-task');
        newToDo.innerText = inputValue;

        saveLocal(inputValue);
    
        input.value = "";
        newDiv.append(newToDo);

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-task');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        newDiv.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('detele-task');
        deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        newDiv.appendChild(deleteBtn);
    } 
    
    input.focus()
}

function deleteToDo(e) {
    item = e.target;
    const getParent = item.parentElement;

    if (item.classList[0] === 'complete-task') {
       getParent.classList.toggle('completed');

       completeItem(getParent);

    } else if (item.classList[0] === 'detele-task') {
        getParent.classList.add('delete');
        removeLocal(getParent);

        getParent.addEventListener("transitionend", e => {
            getParent.remove();
        });
    }
}

function saveLocal(todo) {
    let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
    };

    data.todo.push(todo);
    localStorage.setItem("todoList", JSON.stringify(data));
}


function getToDous() {
    let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
    };

    data.todo.forEach(function(todo) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('toDo');
        list.append(newDiv);

        const newToDo = document.createElement("li");
        newToDo.classList.add('list-task')
        newToDo.innerText = todo;
    
        newDiv.append(newToDo);

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-task');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        newDiv.appendChild(completeBtn)

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('detele-task');
        deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        newDiv.appendChild(deleteBtn)
    })
};

function removeLocal(todo) {
    let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
    };

    const indexLocal = todo.children[0].innerText;
    data.todo.splice(data.todo.indexOf(indexLocal), 1);
    localStorage.setItem("todoList", JSON.stringify(data));
}

function completeItem(todo) {
    let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
    };

    const item = todo;
    const parent = item.parentNode;
    const id = parent.id;
    const value = item.innerText;  

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }

    localStorage.setItem("todoList", JSON.stringify(data));

  let target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0])
}