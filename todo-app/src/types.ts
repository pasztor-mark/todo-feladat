export interface ColumnProps {
    elements: TodoElement[]
    color: string
    status: Status
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
    dueDate: string,
    priority: Priority,
    status: Status
}