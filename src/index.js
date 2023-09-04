
const todoList = {}

let project = [
    'Things, I should do until new year comes', //zero array's element is a title of the project
    {
        title: 'Losing 10 kg of weight', 
        description: 'in order to have better look on my birthday I want to lose 10 kg until its date',
        date: '16.11.2023',
        notes: 'I want to lose wheigt by restrictings in my diet and conducting active excersises',
        isComplete: false,
        priority: 'red',
    },
    {
        title: 'learning 5 new guitar songs', 
        description: 'I want to perform at the New year"s party and because of that I have to learn at least 5 new songs',
        date: '31.12.2023',
        notes: 'My favorite girl Sara very romatic, so I want learn Ed Sheerans songs about love',
        isComplete: false,
        priority: 'yellow',
    },
    {
        title: 'complete project Todo List from theodinproject.com', 
        description: 'This project is a part of my long javascript journey',
        date: '15.09.2023',
        notes: 'Day when I should finalize the project may be postponed. It depends on circumstances',
        isComplete: false,
        priority: 'green'
    },
]

//create single todo
const createTodo = (title, description, date, notes, isComplete, priority) => {
    return {
        title, description, date, notes, isComplete, priority
    }
}

let firstTodo = createTodo ('hi', 'sdfdf', '11.11.2011', 'no notes', false, 2)

//add single todo to a project
const addSingletodo = (singleTodo) => {
    project.push(singleTodo)
    return project
}
addSingletodo(firstTodo)

//create project

const createProject = (title) => {
    const array = []
    array[0] = title
    return array
}

//add a project to a todoList
const addSingleproject = (project) => {
    const singleProjTitle = project[0]
    project.splice(0, 1)
    todoList[singleProjTitle] = project
    return todoList
}
addSingleproject(project)

const toggleIsComplete = (todo) => {
    if (todo.isComplete) todo.isComplete = false
    else todo.isComplete = true
}

const changePriority = (todo, newPriority) => {
    todo.priority = newPriority
}

changePriority(project[0], 'green')
console.log(todoList)








