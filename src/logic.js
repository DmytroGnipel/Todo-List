import { formatDistance, subDays } from "date-fns"

const defaultTodoList = {
    UntilNewYear: [
        {
            title: 'Losing weight',
            date: '16.11.2023',
            description: 'in order to have better look on my birthday I want to lose 5 kg until its date',
            notes: 'I want to lose wheigt by restrictings in my diet and conducting active excersises',
            isComplete: false,
            priority: 'green'
        },
        {
            title: 'Learning songs',
            date: '31.12.2023', 
            description: 'I want to perform at the New year"s party and because of that I have to learn at least 5 new songs',
            notes: 'My favorite girl Sara very romatic, so I want learn Ed Sheerans songs about love',
            isComplete: false,
            priority: 'green'
        },
        {
            title: 'Complete Todo List',
            date: '15.09.2023', 
            description: 'This project from from theodinproject.com is a part of my long javascript journey',
            notes: 'Day when I should finalize the project may be postponed. It depends on circumstances',
            isComplete: false,
            priority: 'green'
        }
    ]
}

const chooceTodoList = () => {
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



//add initial project to initial todoList
//addProject(initialProject)
const counter = 1
//create single todo
const createTodo = (title, date, description, notes) => {
    const isComplete = false
    const priority = 'green'
    const id = counter
    const nameProject = ''
    return {
        title, date, description, notes, priority, isComplete, id, nameProject
    }
    counter++
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



//change todo in the project
const changeTodo = (projectName, IndexOldTodo, newTodo) => { 
    todoList[projectName][IndexOldTodo] = newTodo
}

const toggleCompleteness = (todo) => {
    if (todo.isComplete) todo.isComplete = false
    else todo.isComplete = true
    
}

const changePriority = (todo, newPriority) => {
    todo.priority = newPriority
}


const changeLocalStorage = () => {
    localStorage.setItem('KeeForTodoInStorage', JSON.stringify(todoList))
}

const month = () => {
    const currentDate = new Date()
    const dateInAMonth = new Date(currentDate.getFullYear(), 
        currentDate.getMonth() + 1, currentDate.getDate())
        const interval = dateInAMonth.getTime() - currentDate.getTime()
        
        
    const array = []
    for (const project in todoList)
        for (const todo of todoList[project]) {
          const todoDudate = todo.date
          const arrayWithDate = todoDudate.split('.')
          const dueDate = new Date(arrayWithDate[2], arrayWithDate[1], arrayWithDate[0])
          const todoInterval = dueDate.getTime() - dateInAMonth.getTime()
          if (todoInterval < interval && todoInterval > 0) array.push(todo)
          
            
    }
    
    
return array

}





export {todoList, createTodo, addTodo,
    createProject, addProject, toggleCompleteness, changePriority, removeTodo, changeTodo, changeLocalStorage,
    month}







    

