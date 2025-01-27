import { useState } from "react";
import Row from "./Row";
import { ColumnProps } from "./types";
import { getColumnColorByStatus, getTitleByStatus, getVerboseStatus } from "./functions";

export default function Column({ elements, status, userId} : ColumnProps) {
    const [formData, setFormData] = useState({ title: '', description: '', due_date: '', priority: 'P0' });
    
async function handleTodoCreation() {
    const verboseStatus = getVerboseStatus(status);
    const res = await fetch(`http://localhost:5000/api/${userId}/todos`, {

        body: JSON.stringify({userId, ...formData, status: verboseStatus}),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
    const data = await res.json()
    console.log(data);
}

    
    async function handleSubmit() {
        console.log(await handleTodoCreation());
        
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }
    return (
        <div className={`basis-full lg:basis-5/12 flex flex-col rounded-xl border p-4 m-4`} style={{border: `3px solid ${getColumnColorByStatus(status)}`}}>
            <h2 className="font-bold text-2xl">{getTitleByStatus(status)}</h2>
            <div>
                <h4>New</h4>
                <form className="flex justify-between my-4" onSubmit={handleSubmit}>
                    <input name="title" onChange={handleChange} value={formData.title} type="text" className="border-2 border-white rounded-md p-2" placeholder="Title" />
                    <input name="description" value={formData.description} onChange={handleChange} type="text" className="border-2 border-white rounded-md p-2" placeholder="Description" />
                    <input name="due_date" value={formData.due_date} onChange={handleChange} type="date" className="border-2 border-white rounded-md p-2" />
                    <select name="priority" value={formData.priority} onChange={handleChange} className="border-2 border-white bg-[#1b1b1b] rounded-md p-2">  
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                    <button className="bg-blue-500 p-3 rounded-xl" type="submit">Submit</button>
                </form>
                <hr className="my-5" />
            </div>
            <div className="flex flex-col gap-4">
                {
                    elements.length > 0 ?
                    elements.map((element, index) => (
                        <Row key={index} {...element} userId={userId} />
                    )) : <p className="text-center text-3xl">No todos in this column</p>
                }
            </div>
        </div>
    )
}