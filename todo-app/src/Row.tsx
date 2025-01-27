import { Priority, TodoElement } from "./types";

export default function Row({description, dueDate, id, priority, status, title}: TodoElement) {
    function getRowColorByPriority(priority: Priority) {
        switch(priority) {
            case Priority.P0:
                return '#400400';
            case Priority.P1:
                return '#594100';
            case Priority.P2:
                return '#400400';
            case Priority.P3:
                return '#024f02';
        }
    }
    return (
        <div className={`flex flex-row justify-between items-center p-4 rounded-md`} style={{border: `3px solid ${getRowColorByPriority(priority)}`}}>
            <div className="flex flex-col">
            <p className="text-xl font-semibold">{title}</p>
            <p>due by <b>{dueDate}</b></p>
            </div>
            <p>{description}</p>
            <div className="flex flex-row gap-4">

            <button className="h-8 px-2 bg-blue-500 rounded-md">To-Do</button>
            <button className="h-8 px-2 bg-yellow-500 rounded-md">In Progress</button>
            <button className=" h-8 px-2 bg-green-500 rounded-md">Done</button>
            <button className=" h-8 px-2 bg-purple-500 rounded-md">Dismiss</button>
            <button className=" h-8 px-2 bg-red-500 rounded-md">Delete</button>
            </div>
        </div>
    )
}