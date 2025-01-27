import { Priority } from "./types";

export function getVerboseStatus(statusParam: number) {
    switch(statusParam) {
        case 0:
            return 'TODO';
        case 1:
            return 'IN_PROGRESS';
        case 2:
            return 'DONE';
        case 3:
            return 'DISMISSED';
    
    }
}
export function getTitleByStatus(status: number) {
    switch(status) {
        case 0:0
            return 'To-Do';
        case 1:
            return 'In Progress';
        case 2:
            return 'Done';
        case 3:
            return 'Dismissed';
    }
}
export function getColumnColorByStatus(status: number) {
    switch(status) {
        case 0:
            return '#0000FF';
        case 1:
            return '#FFFF00';
        case 2:
            return '#00FF00';
        case 3:
            return '#FF00FF';
    }
}
export  function getRowColorByPriority(priority: keyof typeof Priority) {
    switch(priority) {
        case "P0":
            return '#00FF00';
        case "P1":
            return '#FFFF00';
        case "P2":
            return '#00FF00';
        case "P3":
            return '#FF00FF';
    }
}