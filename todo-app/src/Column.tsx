import { useState } from "react";
import Row from "./Row";
import { ColumnProps } from "./types";

export default function Column({ elements, color, status} : ColumnProps) {
    const [formData, setFormData] = useState({ title: '', description: '', due_date: '', priority: 0 });

    function getTitleByStatus(status: number) {
        switch(status) {
            case 0:
                return 'To-Do';
            case 1:
                return 'In Progress';
            case 2:
                return 'Done';
            case 3:
                return 'Dismissed';
        }
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(formData);
        
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }
    return (
        <div className={`basis-full lg:basis-5/12 flex flex-col rounded-xl border ${color} border-white p-4 m-4`}>
            <h2 className="font-bold text-2xl">{getTitleByStatus(status)}</h2>
            <div>
                <h4>New</h4>
                <form className="flex justify-between my-4" onSubmit={handleSubmit}>
                    <input name="title" onChange={handleChange} value={formData.title} type="text" className="border-2 border-white rounded-md p-2" placeholder="Title" />
                    <input name="description" value={formData.description} onChange={handleChange} type="text" className="border-2 border-white rounded-md p-2" placeholder="Description" />
                    <input name="due_date" value={formData.due_date} onChange={handleChange} type="date" className="border-2 border-white rounded-md p-2" />
                    <select name="priority" value={formData.priority} onChange={handleChange} className="border-2 border-white bg-[#1b1b1b] rounded-md p-2">  
                        <option value="0">Select priority</option>
                        <option value="0">P0</option>
                        <option value="1">P1</option>
                        <option value="2">P2</option>
                        <option value="3">P3</option>
                    </select>
                    <button className="bg-blue-500 p-3 rounded-xl" type="submit">Submit</button>
                </form>
                <hr className="my-5" />
            </div>
            <div className="flex flex-col gap-4">
                {
                    elements.map((element, index) => (
                        <Row key={index} {...element} />
                    ))
                }
            </div>
        </div>
    )
}