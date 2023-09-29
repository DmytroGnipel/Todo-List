import {initialProject, todoList, createTodo, addTodo, createProject, removeTodo, addProject, 
    toggleIsComplete, changePriority, changeTodo} from './logic'


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
            projectDiv.innerHTML += `
            <p>${elem.title} until ${elem.date}
            <button data-number='${counter + 1}' data-name='${property}' class='editButton'>ed</button></p> 
            <button data-number='${counter + 1}' data-name='${property}' class='removeButton'>X</button></p>
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
    const input = document.querySelector('input')
    input.placeholder = 'enter a name of the new project'
    document.querySelector('.popUp button').addEventListener('click', function() {
    if (input.value) {
        let newProject = createProject(input.value)
        addProject(newProject)
        console.log(todoList)
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
            console.log(todoList)
            const projectName = this.dataset.projectName
            this.remove()
            popUp(6)        
            let array = ['title', 'date', 'description', 'notes', 'completeness', 'priority']
            const inputs = document.querySelectorAll('input')
            for (let i = 0; i < 6; i++) {
                inputs[i].placeholder = `${array[i]}`
            }          
            document.querySelector('.popUp button').addEventListener('click', function() {
                 
            for (const input of inputs) {
                if (!input.value) input.value = ''
            }
                let object = createTodo(inputs[0].value, inputs[1].value, inputs[2].value,
                     inputs[3].value, inputs[4].value, inputs[5].value)
                     console.log(object)
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
            popUp(6)
            const inputs = document.getElementsByTagName('input')
            const paras = document.querySelectorAll('.popUp p')
            const targetTodo = todoList[button.dataset.name][button.dataset.number]
            let counter = 0
            for (const prop in targetTodo) {
                paras[counter].textContent = prop
                inputs[counter].value = targetTodo[prop]
                counter++
            }
            const acceptButton = document.querySelector('.popUp button')
            acceptButton.addEventListener('click', function() {
                let newTodo = createTodo(inputs[0].value, inputs[1].value, inputs[2].value,
                inputs[3].value, inputs[4].value, inputs[5].value)
                changeTodo(button.dataset.name, button.dataset.number, newTodo)
                fourFunctions()
            })
        })
    }
}
editTodo()

//appear pop-up with six inptus and button 'accept'//assistive function
function popUp(amountOfInput) {
    const pop = document.createElement('div')
    pop.classList.add('popUp')
    const content = document.querySelector('.content')
    const acceptButton = document.createElement('button')
    acceptButton.textContent = 'accept'
    const closeLink = document.createElement('a')
    closeLink.href = ''
    closeLink.textContent = 'X'
    closeLink.classList.add = ('closeLink')
    closeLink.addEventListener('click', function(){
        pop.remove()
    })
    pop.append(closeLink)
        for (let i = 0; i < amountOfInput; i++) {
        const para = document.createElement('p')
        const input = document.createElement('input')
        pop.append(para, input)
    }
    pop.append(acceptButton)
    content.appendChild(pop)

}
//four repeating functions
function fourFunctions() {
    arrangeProjects()
    removeTodoPara()
    editTodo()
    createNewTodo()
}


