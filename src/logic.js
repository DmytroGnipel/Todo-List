
const todoList = {}
let initialProject = [
    'UntilNewYear', //zero array's element is a title of the project
    {
        title: 'Losing weight',
        date: '16.11.2023',
        description: 'in order to have better look on my birthday I want to lose 5 kg until its date',
        notes: 'I want to lose wheigt by restrictings in my diet and conducting active excersises',
        isComplete: false,
        priority: 'red',
    },
    {
        title: 'Learning songs',
        date: '31.12.2023', 
        description: 'I want to perform at the New year"s party and because of that I have to learn at least 5 new songs',
        notes: 'My favorite girl Sara very romatic, so I want learn Ed Sheerans songs about love',
        isComplete: false,
        priority: 'yellow',
    },
    {
        title: 'Complete Todo List',
        date: '15.09.2023', 
        description: 'This project from from theodinproject.com is a part of my long javascript journey',
        notes: 'Day when I should finalize the project may be postponed. It depends on circumstances',
        isComplete: false,
        priority: 'green'
    },
]

//create single todo
const createTodo = (title, date, description, notes, isComplete, priority) => {
    return {
        title, date, description, notes, isComplete, priority
    }
}

//add single todo to a project
const addTodo = (todo, project) => {
    project.push(todo)
}

//remove single todo from a project
const removeTodo = (IndexTodo, projectName) => {
    const project = todoList[projectName]
    project.splice(IndexTodo, 1)
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

//add initial project to our todoList
addProject(initialProject)

//change todo in the project
const changeTodo = (projectName, IndexOldTodo, newTodo) => { 
    todoList[projectName][IndexOldTodo] = newTodo
}

const toggleIsComplete = (todo) => {
    if (todo.isComplete) todo.isComplete = false
    else todo.isComplete = true
}

const changePriority = (todo, newPriority) => {
    todo.priority = newPriority
}

export {todoList, initialProject, createTodo, addTodo,
    createProject, addProject, toggleIsComplete, changePriority, removeTodo, changeTodo}






    

