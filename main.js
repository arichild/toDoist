const input = document.querySelector('.task');
const btnCreate = document.querySelector('.create');
const list = document.querySelector('.list-task');

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
    
    input.value = '';
    input.focus()
}

function deleteToDo(e) {
    item = e.target;
    const getParent = item.parentElement;

    if(item.classList[0] === 'complete-task') {
       getParent.classList.toggle('completed');
    } else if (item.classList[0] === 'detele-task') {
        getParent.classList.add('delete');

        getParent.addEventListener("transitionend", e => {
            getParent.remove();
        });
    }
}