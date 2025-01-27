import { getRowColorByPriority } from "./functions";
import { Priority, Status, TodoElement } from "./types";

export default function Row({description, due_date, priority, title, id, userId}: TodoElement) {
    async function handleItemDelete() {
         await fetch(`http://localhost:5000/api/${userId}/todos/${id}`, {
            method: 'DELETE'
        })
        window.location.reload();
    }
    async function handleMoveToTable(status: keyof typeof Status) {
       await fetch(`http://localhost:5000/api/${userId}/todos/${id}`, {
            body: JSON.stringify({status: status }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })

        window.location.reload()
    }
    return (
        <div className={`flex flex-row justify-between items-center p-4 rounded-md`} style={{border: `3px solid ${getRowColorByPriority(priority as unknown as keyof typeof Priority)}`}}>
            <div className="flex flex-col">
            <p className="text-xl font-semibold">{title}</p>
            <p>due by <b>{due_date}</b></p>
            </div>
            <p>{description}</p>
            <div className="flex flex-row gap-4">

            <button onClick={() => handleMoveToTable("TODO")} className="h-8 px-2 bg-blue-500 rounded-md">To-Do</button>
            <button onClick={() => handleMoveToTable("IN_PROGRESS")} className="h-8 px-2 bg-yellow-500 rounded-md">In Progress</button>
            <button onClick={() => handleMoveToTable("DONE")} className=" h-8 px-2 bg-green-500 rounded-md">Done</button>
            <button onClick={() => handleMoveToTable("DISMISSED")} className=" h-8 px-2 bg-purple-500 rounded-md">Dismiss</button>
            <button onClick={handleItemDelete} className=" h-8 px-2 bg-red-500 rounded-md">Delete</button>
            </div>
        </div>
    )
}