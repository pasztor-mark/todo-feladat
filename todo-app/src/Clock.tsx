import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <h1 className="text-3xl font-bold">{time.toLocaleTimeString()}</h1>
        </div>
    )
}