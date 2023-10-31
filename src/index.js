import {todoList, createTodo, addTodo, createProject, removeTodo, addProject, 
    toggleCompleteness, changePriority, changeTodo, searchTodobyId,
     changeLocalStorage, filterTodo} from './logic'

//arrange divs with projects in the div 'content'
function arrangeProjects () {
    cleaning ()
    const content = document.querySelector('.content')
    for (const projectName in todoList) {
        if (projectName !== 'counterId') {
            const projectDiv = document.createElement('div')
            projectDiv.classList.add('projectDiv')
            const projectDivHeader = document.createElement('h4')
            projectDivHeader.textContent = projectName
            projectDiv.append(projectDivHeader)
            content.append(projectDiv)
            const project = todoList[projectName]
            arrangeTodoDivs (project, projectDiv)
            //add button for creating new todo in the project
            const addTodoButton = createAddTodoButton(projectName)
            projectDiv.append(addTodoButton)
        }   
    }
}
arrangeProjects()

//cleaning div content before elements rearrangement
function cleaning () {
    document.querySelector('.content').innerHTML=''
}



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
            console.log(todoList)
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
function editTodoInDOM (by) {
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
                if (!by) fourFunctions()//if parameter is not passed then all projects and todos show in the screen
                else {//if parameter is passed, only sorted todos show in the screen
                    cleaning ()
                    arrangeTodoDivs (filterTodo ()[by], document.querySelector('.content'))
                    removeTodoInDOM (by)
                    editTodoInDOM (by)
                    setSelects (by)
                    toggleCheckboxes (by)
                    changeLocalStorage ()
                    
                    
                }
    
            })
        })
    }
}
editTodoInDOM ()

//appear pop-up with inptus and button 'accept'//assistive function
function popUp (amountOfInput) {
    const pop = document.createElement('div')
    pop.classList.add ('popUp')
    const content = document.querySelector('.content')
    const acceptButton = document.createElement('button')
    acceptButton.textContent = 'accept'
    const closeLink = document.createElement('a')
    closeLink.href = '#'
    closeLink.textContent = 'X'
    closeLink.classList.add = ('closeLink')
    pop.append (closeLink)
        for (let i = 0; i < amountOfInput; i++) {
        const para = document.createElement('p')
        const input = document.createElement('input')
        input.type = 'text'
        pop.append(para, input)
    }
    pop.append(acceptButton)
    content.appendChild(pop)
    closeLink.addEventListener('click', function(){
        pop.remove ()
    })

}
//four repeating functions
function fourFunctions () {
    arrangeProjects ()
    removeTodoInDOM ()
    createTodoInDOM ()
    editTodoInDOM ()
    toggleCheckboxes ()
    setSelects ()
    changeLocalStorage ()

}

function toggleCheckboxes (by) {
    const checkboxes = document.querySelectorAll('input[type=checkbox]')
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', function () {
            const targetTodo = searchTodobyId(this.dataset.id, this.dataset.projectName)
            toggleCompleteness (targetTodo)
            if (!by) fourFunctions()//if parameter is not passed then all projects and todos show in the screen
            else {//if parameter is passed only sorted todos show in the screen
                cleaning ()
                arrangeTodoDivs (filterTodo ()[by], document.querySelector('.content'))
                removeTodoInDOM (by)
                editTodoInDOM (by)
                setSelects (by)
                toggleCheckboxes (by)
                changeLocalStorage ()
                
            }
        })
    }
}
toggleCheckboxes ()

function setSelects (by) {
    const selects = document.querySelectorAll('select')
    for (const select of selects) {
        select.addEventListener('change', function () {
            const targetTodo = searchTodobyId(this.dataset.id, this.dataset.projectName)
            changePriority(targetTodo, `${this.value}`)
            if (!by) fourFunctions()//if parameter is not passed then all projects and todos show in the screen
            else {//if parameter is passed only sorted todos show in the screen
                cleaning ()
                arrangeTodoDivs (filterTodo ()[by], document.querySelector('.content'))
                removeTodoInDOM (by)
                editTodoInDOM (by)
                setSelects (by)
                toggleCheckboxes (by)
                changeLocalStorage ()
                
            }
        })
    }
}
setSelects()

function createEditButton (todo) {
    const editButton = document.createElement('button')
    editButton.textContent = 'Edit todo'
    editButton.classList.add('editButton')
    editButton.dataset.projectName = todo.nameProject
    editButton.dataset.id = todo.id
    return editButton
}

function createRemoveButton (todo) {
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove todo'
    removeButton.classList.add('removeButton')
    removeButton.dataset.projectName = todo.nameProject
    removeButton.dataset.id = todo.id
    return removeButton
}

function createAddTodoButton (projectName) {
    const addTodoButton = document.createElement('button')
    addTodoButton.textContent = 'Add new task'
    addTodoButton.classList.add('addTodoButton')
    addTodoButton.dataset.projectName = projectName
    return addTodoButton
}

function createPriorityChanger (todo) {
    const priorityChanger = document.createElement('select')
    priorityChanger.dataset.projectName = todo.nameProject
    priorityChanger.dataset.id = todo.id
    const arryForPriorityChanger = ['Choose a priority', 'green', 'yellow', 'red']
    for (let i = 0; i < 4; i++) {
        const option = document.createElement('option')
        option.textContent = arryForPriorityChanger[i]
        option.setAttribute('value', `${arryForPriorityChanger[i]}`)
        priorityChanger.append(option)
    }
    return priorityChanger
}

function getCompletenessChanger (todo) {
    const span = document.createElement('span')
    const label = document.createElement('label')
    label.textContent = 'complete'
    label.setAttribute('for', 'iScomplete')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', 'iScomplete')
    checkbox.dataset.projectName = todo.nameProject
    checkbox.dataset.id = todo.id
    span.append(label, checkbox)
    return span
}

function checkCompletnessTodo (todo, todoDiv) {
    const completnessTodo = todo.isComplete
    completnessTodo ? todoDiv.style.textDecoration = 'line-through' : todoDiv.style.textDecoration = 'none'
    todoDiv.style.backgroundColor = todo.priority
}

function arrangeTodoDivs (array, place) {
    for (const todo of array) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todoDiv')
        const editButton = createEditButton(todo)
        const removeButton = createRemoveButton(todo)
        const priorityChanger = createPriorityChanger(todo)
        const span = getCompletenessChanger(todo)
        checkCompletnessTodo(todo, todoDiv)
        todoDiv.append(todo.title, ' until ', todo.dueDate,  editButton, priorityChanger, span, removeButton)
        place.append(todoDiv)   
    } 
}   
           
//remove todo from project
function removeTodoInDOM (by) {
    const buttons = document.querySelectorAll('.removeButton')
    for (const button of buttons) {
        button.addEventListener('click', function () {
            removeTodo(this.dataset.id, this.dataset.projectName)
            if (!by) fourFunctions()//if parameter is not passed then all projects and todos show in the screen
            else {//if parameter is passed only sorted todos show in the screen
                cleaning ()
                arrangeTodoDivs (filterTodo ()[by], document.querySelector('.content'))
                removeTodoInDOM (by)
                editTodoInDOM (by)
                setSelects (by)
                toggleCheckboxes (by)
                changeLocalStorage ()
                
            }
        })
    }
}
removeTodoInDOM()

function show (by) {
    document.querySelector(`.${by}`).addEventListener('click', function () {
    cleaning ()
    const array = filterTodo()[by]//array with sorted by parameter todos
    createAllProjectsLink ()
    arrangeTodoDivs (array, document.querySelector('.content'))
    removeTodoInDOM (by)
    editTodoInDOM (by)
    setSelects (by)
    toggleCheckboxes (by)
})
}

show ('month')
show ('week')
show ('day')
show ('red')
show ('yellow')
show ('complete')
show ('uncomplete')

function createAllProjectsLink () {
    if (!document.querySelector('.allProjectsLink')) {
    const allProjectsLink = document.createElement('a') //after rendering filtred todos 
    allProjectsLink.textContent = 'Back to all projects'//shows up button for returning 
    allProjectsLink.classList.add('allProjectsLink') //to the original page with all projects
    allProjectsLink.setAttribute('href', '#')
    document.querySelector('.side').append(allProjectsLink)
    returnToMainPage ()
    }
}

function returnToMainPage () {
    document.querySelector('.allProjectsLink').addEventListener('click', function () {
        this.remove()
        fourFunctions ()
    })
}


            
            








