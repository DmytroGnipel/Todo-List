import {todoList, createTodo, addTodo, createProject, removeTodo, addProject, 
    toggleCompleteness, changePriority, changeTodo, changeLocalStorage,
    month} from './logic'

//arrange divs with projects in the div 'content'
function arrangeProjects() {
cleaning()
const content = document.querySelector('.content')
    for (const property in todoList) {
        const projectDiv = document.createElement('div')
        projectDiv.dataset.projectName = property
        projectDiv.classList.add('projectDiv')
        projectDiv.innerHTML = `<h4>${property}</h4>`
        let counter = -1
        for (const elem of todoList[property]) {
            let valueOfTextDecoration
            if (elem.isComplete) valueOfTextDecoration = 'line-through'
            else valueOfTextDecoration = 'none'
            projectDiv.innerHTML += `
            <p style='background-color:${elem.priority}; text-decoration: ${valueOfTextDecoration}' data-number='${counter + 1}' data-name='${property}'>${elem.title} until ${elem.date}
            <button data-number='${counter + 1}' data-name='${property}' class='editButton'>edit todo</button> 
            <button data-number='${counter + 1}' data-name='${property}' class='removeButton'>delete todo</button>
            <label for='iScomplete'>complete</label>
            <input type='checkbox' data-number='${counter + 1}' data-name='${property}' id='iScomplete'>
            <select data-number='${counter + 1}' data-name='${property}'>
            <option value="">Choose a priority</option>
            <option value="green">green</option>
            <option value="yellow">yellow</option>
            <option value="red">red</option>
            </select>
            </p>
            `
            counter++
        }
        content.appendChild(projectDiv)
        //add button for adding new todos
        const addTodoButton = document.createElement('button')
        addTodoButton.textContent = 'Add todo to the project'
        addTodoButton.classList.add('addTodoButton')
        addTodoButton.dataset.projectName = property
        projectDiv.insertAdjacentElement('beforeend', addTodoButton)
    }
    
}
arrangeProjects()
//cleaning old divs before arrangement new ones
function cleaning () {
   const divs = document.querySelectorAll('.content div')
   for (const elem of divs)
   elem.remove()
}

//remove todo from projects div//1
function removeTodoPara() {
const buttons = document.querySelectorAll('.removeButton')
for (const button of buttons) {
    button.addEventListener('click', function () {
        removeTodo(this.dataset.number, this.dataset.name)
        fourFunctions()
        })
}
}
removeTodoPara()


//add new project//2

document.querySelector('.addProjectLink').addEventListener('click', function(){
    popUp(1)
    const input = document.querySelector('input[type=text]')
    input.placeholder = 'enter a name of the new project'
    document.querySelector('.popUp button').addEventListener('click', function() {
    if (input.value) {
        let newProject = createProject(input.value)
        addProject(newProject)
        fourFunctions()
    }
    else {
    alert('Your project must to have a name')
    }
    })
})

//create new todo for a project in the DOM//3
function createNewTodo() {
    const buttonsForNewTodos = document.querySelectorAll('.addTodoButton')
    for (let elem of buttonsForNewTodos) {
        elem.addEventListener('click', function() {
            const projectName = this.dataset.projectName
            this.remove()
            popUp(4)        
            let array = ['title', 'date', 'description', 'notes']
            const inputs = document.querySelectorAll('input[type=text]')
            for (let i = 0; i < 4; i++) {
                inputs[i].placeholder = `${array[i]}`
            }          
            document.querySelector('.popUp button').addEventListener('click', function() {
            for (const input of inputs) {
                if (!input.value) input.value = ''
            }
                let object = createTodo(inputs[0].value, inputs[1].value, inputs[2].value,
                     inputs[3].value)
                     addTodo(object, todoList[elem.dataset.projectName])
                     fourFunctions()
                     console.log(todoList)  
                     
            })  
        })
    }
}
createNewTodo()

//edit todos in the DOM//4
function editTodo() {
    const buttons = document.querySelectorAll('.editButton')
    for (const button of buttons) {
        button.addEventListener('click', function() {
            popUp(4)
            const inputs = document.querySelectorAll('input[type=text]')
            const paras = document.querySelectorAll('.popUp p')
            const targetTodo = todoList[button.dataset.name][button.dataset.number]
            let counter = 0
            for (const prop in targetTodo) {
                if (prop !== 'isComplete' && prop !== 'priority') {
                    paras[counter].textContent = prop
                    inputs[counter].value = targetTodo[prop]
                    counter++
                }
            }
            const acceptButton = document.querySelector('.popUp button')
            acceptButton.addEventListener('click', function() {
                let newTodo = createTodo(inputs[0].value, inputs[1].value, inputs[2].value,
                inputs[3].value)
                changeTodo(button.dataset.name, button.dataset.number, newTodo)
                fourFunctions()
            })
        })
    }
}
editTodo()

//appear pop-up with inptus and button 'accept'//assistive function
function popUp(amountOfInput) {
    const pop = document.createElement('div')
    pop.classList.add('popUp')
    const content = document.querySelector('.content')
    const acceptButton = document.createElement('button')
    acceptButton.textContent = 'accept'
    const closeLink = document.createElement('a')
    closeLink.href = '#'
    closeLink.textContent = 'X'
    closeLink.classList.add = ('closeLink')

    pop.append(closeLink)
        for (let i = 0; i < amountOfInput; i++) {
        const para = document.createElement('p')
        const input = document.createElement('input')
        input.type = 'text'
        pop.append(para, input)
    }
    pop.append(acceptButton)
    content.appendChild(pop)
    closeLink.addEventListener('click', function(){
        pop.remove()
        
        

    })

}
//four repeating functions
function fourFunctions() {
    arrangeProjects()
    removeTodoPara()
    editTodo()
    createNewTodo()
    toggleCheckboxes()
    setSelects()
    changeLocalStorage()
    
}


function toggleCheckboxes() {
const checkboxes = document.querySelectorAll('input[type=checkbox]')
for (const checkbox of checkboxes)
checkbox.addEventListener('click', function() {
    let targetTodo = todoList[this.dataset.name][this.dataset.number]
    toggleCompleteness(targetTodo)
    changeLocalStorage()
    const para = document.querySelector(`p[data-number='${this.dataset.number}'][data-name=${this.dataset.name}]`)
    if (targetTodo.isComplete) para.style.textDecoration = 'line-through'
    else para.style.textDecoration = 'none'
    
})}
toggleCheckboxes()

function setSelects() {
const selects = document.querySelectorAll('select')
for (const select of selects)
select.addEventListener('change', function(){
    let targetTodo = todoList[this.dataset.name][this.dataset.number]
    changePriority(targetTodo, `${this.value}`)
    const para = document.querySelector(`p[data-number='${this.dataset.number}'][data-name=${this.dataset.name}]`)
	para.style.backgroundColor = targetTodo.priority
    changeLocalStorage()
})}
setSelects()

//function showInAMonth () {
    //cleaning()
    //const todosInAMonth = month()
    //for (const todo of todosInAMonth) {
        //const para
    //}
    //console.log(todosInAMonth)
    
    
    
    
    
//}
//showInAMonth ()








