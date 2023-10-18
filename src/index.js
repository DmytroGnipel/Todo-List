import {todoList, createTodo, addTodo, createProject, removeTodo, addProject, 
    toggleCompleteness, changePriority, changeTodo, changeLocalStorage} from './logic'

//arrange divs with projects in the div 'content'
function arrangeProjects() {
cleaning()
const content = document.querySelector('.content')
//loop for arrangement projects
    for (const projectName in todoList) {
        const projectDiv = document.createElement('div')
        projectDiv.classList.add('projectDiv')
        const projectDivHeader = document.createElement('h4')
        projectDivHeader.textContent = projectName
        projectDiv.append(projectDivHeader)
        content.append(projectDiv)
        const project = todoList[projectName]
        //loop for arrangement todos
        for (const todo of project) {
            const todoDiv = document.createElement('div')
            todoDiv.classList.add('todoDiv')
            const editButton = document.createElement('button')
            editButton.textContent = 'Edit todo'
            editButton.dataset.projectName = projectName
            editButton.dataset.id = todo.id
            const removeButton = document.createElement('button')
            removeButton.textContent = 'Remove todo'
            removeButton.classList.add('removeButton')
            removeButton.dataset.projectName = projectName
            removeButton.dataset.id = todo.id
            const completnessTodo = todo.isComplete
            completnessTodo ? todoDiv.style.textDecoration = 'line-through' : todoDiv.style.textDecoration = 'none'
            todoDiv.style.backgroundColor = todo.priority

            //create select to choose priority
            const priorityChanger = document.createElement('select')
            priorityChanger.dataset.projectName = projectName
            priorityChanger.dataset.id = todo.id
            const arryForPriorityChanger = ['Choose a priority', 'green', 'yellow', 'red']
            for (let i = 0; i < 4; i++) {
                const option = document.createElement('option')
                option.textContent = arryForPriorityChanger[i]
                option.setAttribute('value', `${arryForPriorityChanger[i]}`)
                priorityChanger.append(option)
            }

            //create checkbox to change completness
            const label = document.createElement('label')
            label.textContent = 'complete'
            label.setAttribute('for', 'iScomplete')
            const checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('id', 'iScomplete')
                
            //compose div with todo
            todoDiv.append(todo.title, ' until ', todo.dueDate,  editButton, priorityChanger, label, checkbox, removeButton)
            //add div with todo into projects div
            projectDiv.append(todoDiv)  
            
}   //add button for creating new todo in the project
        const addTodoButton = document.createElement('button')
        addTodoButton.textContent = 'Add new task'
        addTodoButton.dataset.projectName = projectName
        projectDiv.append(addTodoButton)   
        
    }
}
arrangeProjects()



////////////////////////////////////////////////
//cleaning old divs before arrangement new ones
function cleaning () {
    const content = document.querySelector('.content').innerHTML=''
}


//remove todos from projects
function removeTodoInDOM() {
    
const buttons = document.querySelectorAll('.removeButton')
for (const button of buttons) {
    button.addEventListener('click', function () {
        removeTodo(this.dataset.id, this.dataset.projectName)
        
        fourFunctions()
        })
}
}
removeTodoInDOM()


//add new project

document.querySelector('.addProjectLink').addEventListener('click', function () {
    popUp(1)
    const input = document.querySelector('input[type=text]')
    input.placeholder = 'enter a name for new project'
    document.querySelector('.popUp button').addEventListener('click', function () {
        if (input.value) {
            const newProject = createProject(input.value)
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
    removeTodoInDOM()
    //editTodo()
    //createNewTodo()
    //toggleCheckboxes()
    //setSelects()
    //changeLocalStorage()
    
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








