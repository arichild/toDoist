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
        newToDo.classList.add('list-task')
        newToDo.innerText = inputValue;

        saveLocal(inputValue);
    
        input.value = "";
        newDiv.append(newToDo);

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-task');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        newDiv.appendChild(completeBtn)

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('detele-task');
        deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        newDiv.appendChild(deleteBtn)
    } 
    
    input.focus()
}

function deleteToDo(e) {
    item = e.target;
    const getParent = item.parentElement;

    if(item.classList[0] === 'complete-task') {
       getParent.classList.toggle('completed');
       localStorage.setItem('done', getParent.classList);

    } else if (item.classList[0] === 'detele-task') {
        getParent.classList.add('delete');
        removeLocal(getParent);

        getParent.addEventListener("transitionend", e => {
            getParent.remove();
        });
    }
}

document.addEventListener("DOMContentLoaded", checkTheme);

function checkTheme(e) {
    const test = e.target;
    const localStorageDone = localStorage.getItem('done');

    console.log(list.children.target)

    if (localStorageDone !== null && localStorageDone === 'toDo completed') {
        for(let i = 0; i <= list.children.length; ++i) {
            list.children[i].className = localStorageDone;
            // console.log(list.children[i])
        }
    }
}

function saveLocal(todo) {
    let saveToDo;

    if(localStorage.getItem('saveToDo') === null) {
        saveToDo = [];
    } else {
        saveToDo = JSON.parse(localStorage.getItem('saveToDo'));
    }

    saveToDo.push(todo);
    localStorage.setItem("saveToDo", JSON.stringify(saveToDo));
}

function getToDous() {
    let saveToDo;

    if (localStorage.getItem("saveToDo") === null) {
        saveToDo = [];
    } else {
        saveToDo = JSON.parse(localStorage.getItem("saveToDo"));
    }

    saveToDo.forEach(function(todo) {
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
    let saveToDo;

    if (localStorage.getItem("saveToDo") === null) {
        saveToDo = [];
    } else {
        saveToDo = JSON.parse(localStorage.getItem("saveToDo"));
    }

    const indexLocal = todo.children[0].innerText;    
     saveToDo.splice(saveToDo.indexOf(indexLocal), 1);
     localStorage.setItem('saveToDo', JSON.stringify(saveToDo))
}