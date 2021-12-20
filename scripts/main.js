const input = document.querySelector('.task');
const btnCreate = document.querySelector('.create');
const uncompletedList = document.querySelector('.uncompleted');
const completedList = document.querySelector('.completed');
const removeAll = document.querySelector('.remove-todo');
const uncomplitedCheck = document.getElementById('uncomplited-check');
const complitedCheck = document.getElementById('complited-check');

const TODO = 'to-do';
const LIST = 'list-task';
const COMPLETE_BTN = 'complete-task'; 
const DELETE_BTN = 'detele-task';
const COMPLETED_TODO = 'to-do-completed';

document.addEventListener('DOMContentLoaded', getToDous);
btnCreate.addEventListener('click', createTask);
document.body.addEventListener('click', deleteToDo);
removeAll.addEventListener('click', removeAllUncompleted);

let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

function createTask(e) {
    let inputValue = input.value;
    let newDiv = document.createElement('div');
    let newLi = document.createElement('li');
    
    e.preventDefault();

    if (inputValue.length) {
        newDiv.classList.add(TODO);
        uncompletedList.append(newDiv);

        newLi.classList.add(LIST);
        newLi.innerText = inputValue;
        newDiv.append(newLi);

        saveLocal(inputValue);
    
        input.value = '';

        buttons(newDiv);
    } 
}

function buttons(todo) {
    let completeBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');
    
    completeBtn.classList.add(COMPLETE_BTN);
    completeBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
    todo.appendChild(completeBtn);

    deleteBtn.classList.add(DELETE_BTN);
    deleteBtn.innerHTML = '<i class="far fa-trash-alt" aria-hidden="true"></i>';
    todo.appendChild(deleteBtn);
}

function saveLocal(todo) {
    data.todo.push(todo);
    localStorage.setItem('todoList', JSON.stringify(data));
}

function getToDous() {
    if (data.todo !== 'undefined' && !data.todo.length && data.completed !== 'undefined' && !data.completed.length) return;

    for (let i = 0; i < data.todo.length; i++) {
        let value = data.todo[i];
        let newDiv = document.createElement('div');
        let newLi = document.createElement('li');

        newDiv.classList.add(TODO);
        uncompletedList.append(newDiv);

        newLi.classList.add(LIST);
        newLi.innerText = value;
        newDiv.append(newLi);

        buttons(newDiv);
    }

    for (let i = 0; i < data.completed.length; i++) {
        let value = data.completed[i];
        let newDiv = document.createElement('div');
        let newLi = document.createElement('li');

        newDiv.classList = COMPLETED_TODO;
        document.getElementById('completed').append(newDiv);

        newLi.classList.add(LIST);
        newLi.innerText = value;
        newDiv.append(newLi);

        buttons(newDiv);
    }
}

function deleteToDo(e) {
    let item = e.target;
    let getParent = item.parentElement;

    if (item.classList[0] === COMPLETE_BTN) {
       getParent.classList.toggle(TODO);
       getParent.classList.toggle(COMPLETED_TODO);
       completeToDo(getParent);

    } else if (item.classList[0] === DELETE_BTN) {
        getParent.style.opacity = 0;
        getParent.style.transition = 'all 0.4s ease-out';
        
        removeLocal(getParent);

        getParent.addEventListener('transitionend', e => {
            getParent.remove();
        });
    }
}

function removeLocal(todo) {
    let indexLocal = todo.children[0].innerText;

    if (todo.className === TODO) {
        data.todo.splice(data.todo.indexOf(indexLocal), 1);
    } else if (todo.className === COMPLETED_TODO) {
        data.completed.splice(data.completed.indexOf(indexLocal), 1);
    }

    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeAllUncompleted() {
    if (uncomplitedCheck.checked === true && complitedCheck.checked === false) {
        uncompletedList.innerHTML = '';
        data.todo = [];
    } else if (complitedCheck.checked === true && uncomplitedCheck.checked === false) {
        completedList.innerHTML = '';
        data.completed = [];
    } else if (uncomplitedCheck.checked === true && complitedCheck.checked === true) {
        uncompletedList.innerHTML = '';
        completedList.innerHTML = '';

        data.todo = [];
        data.completed = [];
    }

    localStorage.setItem("checkbox1", uncomplitedCheck.checked);
    localStorage.setItem("checkbox2", complitedCheck.checked);
}

(function() {
    uncomplitedCheck.checked = JSON.parse(localStorage.getItem("checkbox1"));
    complitedCheck.checked = JSON.parse(localStorage.getItem("checkbox2"));
})();

function completeToDo(todo) {
    let item = todo;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;  

    if (todo.className === COMPLETED_TODO) {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value); 
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }

    localStorage.setItem('todoList', JSON.stringify(data));

    let target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.appendChild(item, target.childNodes[0]);
}

window.addEventListener('click', function(e) {
    let isClickInsideElement = document.querySelector('.uncompleted').contains(e.target);
    let allToDo = document.querySelectorAll('.list-task');

    for (let i = 0; i < allToDo.length; i++) {
        if (isClickInsideElement) {
            allToDo[i].contentEditable = 'true';
        } else { 
            for (let i = 0; i < data.todo.length; i++) {
                let value = data.todo[i];
                data.todo.splice(data.todo.indexOf(value), 1, allToDo[i].innerText);
            }

            allToDo[i].contentEditable = 'false';
        } 
    }

    localStorage.setItem('todoList', JSON.stringify(data));
});