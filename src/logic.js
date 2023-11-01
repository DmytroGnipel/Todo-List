import { formatDistance, subDays } from "date-fns"
//create todoList with default project and three dummy todos.
const defaultTodoList = {
    //introduce counterId for numberning all subsequent todos. This counterId will be moving with todoList
    //from app to localstorage and by doing that it will be ceep up counting even when user
    //reload page or turn off computer / browser
    counterId: 3, 
    UntilNewYear: [
        {
            title: 'Losing weight',
            dueDate: '31.12.2023',
            description: 'In order to have better look on my birthday I want to lose 5 kg until its date',
            notes: 'I want to lose wheigt by restrictings in my diet and conducting active excersises',
            isComplete: false,
            priority: 'yellow',
            id: 0,
            nameProject: 'UntilNewYear'
        },
        {
            title: 'Learning songs',
            dueDate: '21.11.2023', 
            description: 'I want to give a performance at the New year"s party and because of that I have to learn at least 5 new songs',
            notes: 'My favorite girl very romatic, so I want to learn Ed Sheerans songs about love',
            isComplete: false,
            priority: 'red',
            id: 1,
            nameProject: 'UntilNewYear'
        },
        {
            title: 'Complete Todo List',
            dueDate: '15.11.2023',
            description: 'This project from theodinproject.com is a part of my long javascript learning journey',
            notes: 'Day when I should finalize the project may be postponed. It depends on diferent circumstances',
            isComplete: false,
            priority: 'green',
            id: 2,
            nameProject: 'UntilNewYear'
        }
    ]
}

const chooceTodoList = () => { //choose what todoList to use. 
    //If localstorage is empty, then choose default todoList
    //if localstorage isn't empty, then take todoList from there
    let todoList
    if (!localStorage.getItem('KeeForTodoInStorage')) {
        todoList = defaultTodoList
    }
    else {
        let todoINJsForman = localStorage.getItem('KeeForTodoInStorage')
        let todoFromStorage = JSON.parse(todoINJsForman)
        todoList = todoFromStorage
    }
    return todoList
}
const todoList = chooceTodoList()

//create single todo. Property isComplete by default is false, property priority bu default is green
//This function have the counter, that will be counting todos Ids if Id pass to function as a parameter
const createTodo = (title, dueDate, description, notes, nameProject, id) => {
    const isComplete = false
    const priority = 'green'
    if (!id) id = todoList.counterId
    todoList.counterId++
    return {
        title, dueDate, description, notes, priority, isComplete, id, nameProject
    }
    
}

//add single todo to a project
const addTodo = (todo, project) => {
    project.push(todo)
}

//search target todo by Id and project name
const searchTodobyId = (todoId, projectName) => {
    const project = todoList[projectName]
       for (const todo of project) {
        if (todo.id == todoId) {
            return todo
        }
    }
}

//remove single todo from a project
const removeTodo = (todoId, projectName) => {
    const project = todoList[projectName]
    const targetTodo = searchTodobyId(todoId, projectName)
    const indexTodo = project.indexOf(targetTodo)
    project.splice(indexTodo, 1)
}

//create project
const createProject = (title) => {
    const array = []
    array[0] = title
    return array
}

//add single project to the todoList
const addProject = (project) => {
    const projTitle = project[0]
    project.splice(0, 1)
    todoList[projTitle] = project
    return todoList
}

//change todo in the project
const changeTodo = (todoId, projectName, newTodo) => {
    const targetTodo = searchTodobyId(todoId, projectName)
    const project = todoList[projectName]
    const indexTodo = project.indexOf(targetTodo)
    todoList[projectName][indexTodo] = newTodo
}

//toggle property isComplete from false to true and in the opposite dirrection
const toggleCompleteness = (todo) => {
    if (todo.isComplete) todo.isComplete = false
    else todo.isComplete = true
    
}
//change property priority
const changePriority = (todo, newPriority) => {
    todo.priority = newPriority
}
//change or rewrite todoList in localstorage after committing operations
const changeLocalStorage = () => {
    localStorage.setItem('KeeForTodoInStorage', JSON.stringify(todoList))
}
//filtering or sorting todo by:
//1. period of time - month, week, day are accessible
//2. color of priority - red and yellow are accessible
//2. completness - both complete and uncomplete are accessible
const filterTodo = () => {
    const inAMonth = new Date(new Date().getFullYear(), 
    new Date().getMonth() + 1, new Date().getDate())
    const inAWeek = new Date(new Date().getFullYear(), 
    new Date().getMonth(), new Date().getDate() + 7)
    const inADay = new Date(new Date().getFullYear(), 
    new Date().getMonth(), new Date().getDate()+1, 0, 0, 0)  
    const untilMonth = inAMonth.getTime() - new Date().getTime()
    const untilWeek = inAWeek.getTime() - new Date().getTime()
    const untilDay = inADay.getTime() - new Date().getTime()
    const month = []
    const week = []
    const day = []
    const red = []
    const yellow = []
    const complete = []
    const uncomplete = []
    for (const project in todoList) {
        if (project !== 'counterId') {
            for (const todo of todoList[project]) {
                const todoDudate = todo.dueDate
                const arrayWithDate = todoDudate.split('.')
                const dueDate = new Date(arrayWithDate[2], arrayWithDate[1] - 1, arrayWithDate[0], 23, 59, 59)
                const todoInterval = dueDate.getTime() - new Date().getTime()           
            if (todoInterval < untilMonth && todoInterval > 0) month.push(todo)
            if (todoInterval < untilWeek && todoInterval > 0) week.push(todo)
            if (todoInterval < untilDay && todoInterval > 0) day.push(todo)
            if (todo.priority === 'red') red.push(todo)
            if (todo.priority === 'yellow') yellow.push(todo)
            todo.isComplete ? complete.push(todo) : uncomplete.push(todo)
            }
            
        }
    }
    return {month, week, day, red, yellow, complete, uncomplete}
}

export {todoList, createTodo, addTodo,
    createProject, addProject, toggleCompleteness, changePriority, removeTodo,
    changeTodo, searchTodobyId, changeLocalStorage, filterTodo
}