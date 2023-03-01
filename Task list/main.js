const input = document.querySelector('.input-task')
const btAdd = document.querySelector('.btn-task')
const tasks = document.querySelector('.tasks')
const del = document.querySelector('.del')

function cleanInput(){
    input.value = ''
}

function saveTask(){
    const liTasks = tasks.querySelectorAll('li')
    const allTasks = []
    for(let i of liTasks){
        let list = i.innerText
        list = list.replace('Delete', '').trim()
        allTasks.push(list)
    }

    const taskJSON = JSON.stringify(allTasks)
    console.log(taskJSON)
    localStorage.setItem('tasks', taskJSON)
}

function createLi(){
    const li = document.createElement('li')
    li.setAttribute('class', 'task')
    return li
}

function createBt(){
    const bt = document.createElement('button')
    bt.innerText = 'Delete'
    bt.setAttribute('class', 'del')
    bt.setAttribute('tittle', 'Del task')
    return bt
}

function createTasks(inputText){
    const li = createLi()
    li.innerText= inputText
    const bt = createBt()
    tasks.appendChild(li)
    li.appendChild(bt)
    saveTask()
}

input.addEventListener('keypress', function(e){
    if(! input.value) return
    if(e.keyCode === 13){
        createTasks(input.value)
        cleanInput()
    }
})

btAdd.addEventListener('click', function(e){
    if(! input.value) return
    createTasks(input.value)
    cleanInput()
})

document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('del')){
        el.parentElement.remove()
        saveTask()
    }
     
})

function savedStorage(){
    const tasks = localStorage.getItem('tasks')
    const taskArray = JSON.parse(tasks)
    for(let i of taskArray){
        createTasks(i)
    }
}

savedStorage()