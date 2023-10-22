import {todoList, createTodo, addTodo, createProject, removeTodo, addProject, 
    toggleCompleteness, changePriority, changeTodo, searchTodobyId, changeLocalStorage} from './logic'

//arrange divs with projects in the div 'content'
function arrangeProjects() {
cleaning()
const content = document.querySelector('.content')
//loop for arrangement projects
    for (const projectName in todoList) {
        if (projectName !== 'counterId') {
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
            editButton.classList.add('editButton')
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
            checkbox.dataset.projectName = projectName
            checkbox.dataset.id = todo.id
            
            
                
            //compose div with todo
            todoDiv.append(todo.title, ' until ', todo.dueDate,  editButton, priorityChanger, label, checkbox, removeButton)
            //add div with todo into projects div
            projectDiv.append(todoDiv)  
            
}   //add button for creating new todo in the project
        const addTodoButton = document.createElement('button')
        addTodoButton.textContent = 'Add new task'
        addTodoButton.classList.add('addTodoButton')
        addTodoButton.dataset.projectName = projectName
        projectDiv.append(addTodoButton)   
    }   
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

//create new todo for a project in the DOM
function createTodoInDOM () {
    const buttonsForNewTodos = document.querySelectorAll('.addTodoButton')
    for (let button of buttonsForNewTodos) {
        button.addEventListener('click', function () {
            const projectName = this.dataset.projectName
            this.remove()
            popUp(4)        
            let array = ['title', 'date', 'description', 'notes']
            const inputs = document.querySelectorAll('input[type=text]')
            for (let i = 0; i < 4; i++) {
                inputs[i].placeholder = `${array[i]}`
            }          
            document.querySelector('.popUp button').addEventListener('click', function () {
                let todo = createTodo(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, projectName)
                addTodo(todo, todoList[projectName])
                fourFunctions()
            })  
        })
    }
}
createTodoInDOM ()

//edit todos in the DOM//4
function editTodoInDOM () {
    const buttons = document.querySelectorAll('.editButton')
    for (const button of buttons) {
        button.addEventListener('click', function() {
            popUp(4)
            const inputs = document.querySelectorAll('input[type=text]')
            const paras = document.querySelectorAll('.popUp p')
            const targetTodo = searchTodobyId(this.dataset.id, this.dataset.projectName)
            let counter = 0
            for (const prop in targetTodo) {
                if (prop !== 'isComplete' &&
                prop !== 'priority' &&
                prop !== 'nameProject' &&
                prop !== 'id') {
                    paras[counter].textContent = prop
                    inputs[counter].value = targetTodo[prop]
                    counter++
                }
            }
            const acceptButton = document.querySelector('.popUp button')
            acceptButton.addEventListener('click', () => {
                const newTodo = createTodo(inputs[0].value, inputs[1].value, inputs[2].value,
                inputs[3].value, this.dataset.projectName, this.dataset.id)
                changeTodo(this.dataset.id, this.dataset.projectName, newTodo)
                fourFunctions()
            })
        })
    }
}
editTodoInDOM ()

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
    createTodoInDOM()
    editTodoInDOM()
    toggleCheckboxes()
    setSelects()
    changeLocalStorage()
    
}

function toggleCheckboxes () {
    const checkboxes = document.querySelectorAll('input[type=checkbox]')
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', function () {
            const targetTodo = searchTodobyId(this.dataset.id, this.dataset.projectName)
            toggleCompleteness (targetTodo)
            fourFunctions ()
        })
    }
}
toggleCheckboxes ()

function setSelects () {
    const selects = document.querySelectorAll('select')
    for (const select of selects) {
        select.addEventListener('change', function () {
            const targetTodo = searchTodobyId(this.dataset.id, this.dataset.projectName)
            changePriority(targetTodo, `${this.value}`)
            fourFunctions ()
        })
    }
}
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








