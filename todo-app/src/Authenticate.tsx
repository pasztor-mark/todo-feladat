import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Authenticate() {
    const {login, register} = useAuth();
    async function submitLogin() {
        const response = await login(username, password);
    }
    async function submitRegister() {
        const response = await register(username, password);
    } 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <h1 className="text-4xl">To-Do App</h1>
            <h4>Pásztor Márk remekműve</h4>
            <input onChange={(e) => setUsername(e.currentTarget.value)} className="border border-blue-500 p-3 rounded-xl" placeholder="Enter your username"/>
            <input type="password" onChange={(e) => setPassword(e.currentTarget.value)} className="border border-blue-500 p-3 rounded-xl" placeholder="Enter your password"/>
            <div className="flex gap-4 justify-between w-auto">

            <button onClick={() => submitLogin()} className="bg-blue-500 p-3 rounded-xl">Log In</button>
            <button onClick={() => submitRegister()} className="bg-blue-500 p-3 rounded-xl">Register</button>
            </div>
        </div>
    )
}