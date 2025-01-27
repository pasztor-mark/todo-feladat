export interface ColumnProps {
    elements: TodoElement[]
    status: Status
    userId: number
}
export enum Priority {
    P0, P1, P2, P3
}
export enum Status {
    TODO, IN_PROGRESS, DONE, DISMISSED
}
export interface TodoElement {
    id: number,
    title: string,
    description: string,
    due_date: string,
    priority: Priority,
    status: Status
    userId?: number
}