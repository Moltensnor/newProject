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

export type CostList = {
    id: number,
    name: string,
    date: string,
    desription: string,
    userEmail: string,
    budget: number | undefined,
}

export type CostGroup = {
    id: number,
    name: string,
    hexcode: string,
    budget: number | undefined,
    costList: CostList,
}

export type CostItem = {
    id: number,
    name: string,
    description: string,
    amount: number,
    costGroup: CostGroup,
    costList: CostList,
}

export type NewCostList = {
    name: string,
    date: string,
    desription: string,
    userEmail: string,
    budget: number | undefined,
}

export type NewCostGroup = {
    name: string,
    hexcode: string,
    budget: number | undefined,
    costList: CostList,
}

export type NewCostItem = {
    name: string,
    description: string,
    amount: number,
    costGroup: CostGroup,
    costList: CostList,
}

export type BudgetPair = {
    first: number,
    second: number,
}

export type CostGroupPair = {
    first: CostGroup,
    second: BudgetPair,
}

export type BudgetCostPair = {
    first: number,
    second: BudgetPair,
}

export type FullBudgetCostPair = {
    first: CostGroup,
    second: BudgetCostPair,
}

export type CostItemPair = {
    first: CostItem,
    second: number,
}