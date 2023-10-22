import { formatDistance, subDays } from "date-fns"

const defaultTodoList = {
    counterId: 3,
    UntilNewYear: [
        {
            title: 'Losing weight',
            dueDate: '16.11.2023',
            description: 'in order to have better look on my birthday I want to lose 5 kg until its date',
            notes: 'I want to lose wheigt by restrictings in my diet and conducting active excersises',
            isComplete: false,
            priority: 'green',
            id: 0,
            nameProject: 'UntilNewYear'
        },
        {
            title: 'Learning songs',
            dueDate: '31.12.2023', 
            description: 'I want to perform at the New year"s party and because of that I have to learn at least 5 new songs',
            notes: 'My favorite girl Sara very romatic, so I want learn Ed Sheerans songs about love',
            isComplete: false,
            priority: 'green',
            id: 1,
            nameProject: 'UntilNewYear'
        },
        {
            title: 'Complete Todo List',
            dueDate: '15.09.2023', 
            description: 'This project from from theodinproject.com is a part of my long javascript journey',
            notes: 'Day when I should finalize the project may be postponed. It depends on circumstances',
            isComplete: false,
            priority: 'green',
            id: 2,
            nameProject: 'UntilNewYear'
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





//create single todo
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
    createProject, addProject, toggleCompleteness, changePriority, removeTodo, changeTodo, searchTodobyId, changeLocalStorage
}