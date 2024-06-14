export type Password = {
    id: string,
    name: string,
    password: string,
    website: string,
    username: string
}

export type Importance = {
    id: number,
    weight: number,
    importanceLevels: number,
}

export type Task = {
    id: string,
    name: string,
    description: string,
    importance: Importance,
    todoList: TaskList,
    complete: boolean,
} | undefined

export type TaskList = {
    id: number,
    name: string,
    userEmail: string,
    date: string,
    description: string,
}

export type NewTaskList = {
    name: string,
    userEmail: string,
    date: string,
    description: string,
}

export type NewImportance = {
    weight: number,
    importanceLevels: number,
}

export type NewTask = {
    name: string,
    description: string,
    importance: Importance,
    todoList: TaskList,
    complete: boolean,
}