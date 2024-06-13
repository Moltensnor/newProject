export type Password = {
    id: string,
    name: string,
    password: string,
    website: string,
    username: string
}

export type Importance = {
    id: string,
    weight: number,
    level: number,
}

export type Task = {
    id: string,
    email: string,
    name: string,
    description: string,
    importance: Importance,
}

export type TaskList = {
    id: number,
    name: string,
    userEmail: string,
    date: string,
    description: string,
}