const input = document.querySelector('.task');
const btnCreate = document.querySelector('.create');
const uncompletedList = document.querySelector('.uncompleted');
const completedList = document.querySelector('.completed');
const removeAll = document.querySelector('.remove-todo');
const uncomplitedCheck = document.getElementById('uncomplited-check');
const complitedCheck = document.getElementById('complited-check');

document.addEventListener('DOMContentLoaded', getToDous);
btnCreate.addEventListener('click', createTask);
document.body.addEventListener('click', deleteToDo);
removeAll.addEventListener('click', removeAllUncompleted);
removeAll.addEventListener('click', saveStatusCheckbox);
getCheckBox();

const TODO = 'toDo';
const LIST = 'list-task';
const COMPLETE_BTN = 'complete-task'; 
const DELETE_BTN = 'detele-task';

let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

function createTask(e) {
    e.preventDefault();
  
    let inputValue = input.value;

    if (inputValue.length) {
        const newDiv = document.createElement('div');
        newDiv.classList.add(TODO);
        uncompletedList.append(newDiv);

        const newLi = document.createElement('li');
        newLi.classList.add(LIST);
        newLi.innerText = inputValue;

        saveLocal(inputValue);
    
        input.value = '';
        newDiv.append(newLi);

        buttons(newDiv);
    } 
}

function buttons(todo) {
    const completeBtn = document.createElement('button');
    completeBtn.classList.add(COMPLETE_BTN);
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    todo.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add(DELETE_BTN);
    deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    todo.appendChild(deleteBtn);
}

function saveLocal(todo) {
    data.todo.push(todo);
    localStorage.setItem('todoList', JSON.stringify(data));
}

function getToDous() {
    if (!data.todo.length && !data.completed.length) return;

    for (let i = 0; i < data.todo.length; i++) {
        let value = data.todo[i];

        const newDiv = document.createElement('div');
        newDiv.classList.add(TODO);
        uncompletedList.append(newDiv);

        const newLi = document.createElement('li');
        newLi.classList.add(LIST)
        newLi.innerText = value;
    
        newDiv.append(newLi);

        buttons(newDiv);
    }

    for (let i = 0; i < data.completed.length; i++) {
        const value = data.completed[i];

        const newDiv = document.createElement('div');
        newDiv.classList = 'toDo completed';
        document.getElementById('completed').append(newDiv);

        const newLi = document.createElement('li');
        newLi.classList.add(LIST);
        newLi.innerText = value;
    
        newDiv.append(newLi);

        buttons(newDiv);
    }
};

function deleteToDo(e) {
    const item = e.target;
    const getParent = item.parentElement;

    if (item.classList[0] === COMPLETE_BTN) {
       getParent.classList.toggle('completed');
       completeToDo(getParent);

    } else if (item.classList[0] === DELETE_BTN) {
        getParent.classList.add('delete');
        removeLocal(getParent);

        getParent.addEventListener('transitionend', e => {
            getParent.remove();
        });
    }
}

function removeLocal(todo) {
    const indexLocal = todo.children[0].innerText;

    if (todo.className === 'toDo delete') {
        data.todo.splice(data.todo.indexOf(indexLocal), 1);
    } else if (todo.className === 'toDo completed delete') {
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
}

function saveStatusCheckbox() {
    localStorage.setItem("checkbox1", uncomplitedCheck.checked);
    localStorage.setItem("checkbox2", complitedCheck.checked);
}

function getCheckBox() {
    let checkbox1 = JSON.parse(localStorage.getItem("checkbox1"));
    uncomplitedCheck.checked = checkbox1;
    
    let checkbox2 = JSON.parse(localStorage.getItem("checkbox2"));
    complitedCheck.checked = checkbox2;
}

function completeToDo(todo) {
    const item = todo;
    const parent = item.parentNode;
    const id = parent.id;
    const value = item.innerText;  

    if (todo.className === 'toDo completed') {
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
    const allToDo = document.getElementsByTagName('li');

    for (let i = 0; i < allToDo.length; i++) {
        if (e.target == allToDo[i]) {
            allToDo[i].contentEditable = 'true';
        } else { 
            for (let i = 0; i < data.todo.length; i++) {
                let value = data.todo[i];

                data.todo.splice(data.todo.indexOf(value), 1, allToDo[i].innerText);
                value = data.todo[i];
            }

            allToDo[i].contentEditable = 'false';
        }
    }

    localStorage.setItem('todoList', JSON.stringify(data));
});