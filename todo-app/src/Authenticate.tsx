import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Authenticate() {
    const {login} = useAuth();
    async function submitAuth() {
        console.log(username);
        const response = await login(username);
        console.log(response);
    }
    const [username, setUsername] = useState('');
    return (
        
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <h1 className="text-4xl">To-Do App</h1>
            <h4>Pásztor Márk remekműve</h4>
            <input onChange={(e) => setUsername(e.currentTarget.value)} className="border border-blue-500 p-3 rounded-xl" placeholder="Enter your username"/>
            <button onClick={() => submitAuth()} className="bg-blue-500 p-3 rounded-xl">Log In or Register</button>
        </div>
    )
}