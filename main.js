const input = document.querySelector('.task');
const btnCreate = document.querySelector('.create');
const list = document.querySelector('.list-task');

document.addEventListener('DOMContentLoaded', getToDous);
btnCreate.addEventListener('click', createTask);
document.body.addEventListener('click', deleteToDo);

let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

function createTask(e) {
    e.preventDefault();
  
    let inputValue = input.value;

    if (inputValue) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('toDo');
        list.append(newDiv);

        const newLi = document.createElement('li');
        newLi.classList.add('list-task');
        newLi.innerText = inputValue;

        saveLocal(inputValue);
    
        input.value = '';
        newDiv.append(newLi);

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-task');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        newDiv.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('detele-task');
        deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        newDiv.appendChild(deleteBtn);

        window.addEventListener('click', function(e) {
            const itemValue = newLi.textContent;

            if (e.target == newLi && newDiv.className === 'toDo'){
                newLi.contentEditable = 'true';
            } else {
                newLi.contentEditable = 'false';

                for (let i = 0; i < data.todo.length; i++) {
                    if (inputValue === data.todo[i]) { 
                        data.todo.splice(data.todo.indexOf(inputValue), 1, itemValue);
                        inputValue = data.todo[i];
                    } else if (inputValue === data.todo[i]) {
                        data.todo.splice(data.todo.indexOf(inputValue), 1, itemValue);
                    }
                }
            }

            localStorage.setItem('todoList', JSON.stringify(data));
        });
    } 
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
        newDiv.classList.add('toDo');
        list.append(newDiv);

        const newLi = document.createElement('li');
        newLi.classList.add('list-task')
        newLi.innerText = value;
    
        newDiv.append(newLi);

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-task');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        newDiv.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('detele-task');
        deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        newDiv.appendChild(deleteBtn);

        window.addEventListener('click', function(e) {
            const itemValue = newLi.textContent;

            if (e.target == newLi && newDiv.className === 'toDo'){
                newLi.contentEditable = 'true';
            } else {
                newLi.contentEditable = 'false';

                for (let i = 0; i < data.todo.length; i++) {
                    if (value === data.todo[i]) { 
                        data.todo.splice(data.todo.indexOf(value), 1, itemValue);
                        value = data.todo[i];
                    } else if (value === data.todo[i]) {
                        data.todo.splice(data.todo.indexOf(value), 1, itemValue);
                    }
                }
            }

            localStorage.setItem('todoList', JSON.stringify(data));
        });
    }

    for (let j = 0; j < data.completed.length; j++) {
        const value = data.completed[j];

        const newDiv = document.createElement('div');
        newDiv.classList = 'toDo completed';
        document.getElementById('completed').append(newDiv);

        const newLi = document.createElement('li');
        newLi.classList.add('list-task');
        newLi.innerText = value;
    
        newDiv.append(newLi);

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-task');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        newDiv.appendChild(completeBtn)

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('detele-task');
        deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        newDiv.appendChild(deleteBtn)
    }
};

function deleteToDo(e) {
    item = e.target;
    const getParent = item.parentElement;

    if (item.classList[0] === 'complete-task') {
       getParent.classList.toggle('completed');
       completeToDo(getParent);

    } else if (item.classList[0] === 'detele-task') {
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

// window.addEventListener('mouseup', function(e) {
//     const li = document.querySelector('.toDo');
//     const test = this.document.querySelector('.task').value;

//     console.log(e.target);
//     console.log(li)

//     // for (let i = 0; i < data.todo.length; i++){
//     //     console.log(data.todo[i] === li.children[0].textContent)
//     // }

//     if(e.target == li.children[0]) {
//         li.children[0].contentEditable = 'true';
//     } else {
//         li.children[0].contentEditable = 'false';
//     }
// });