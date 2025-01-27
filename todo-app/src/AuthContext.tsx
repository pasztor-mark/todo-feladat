import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface AuthContextType {
    userId: number | null;
    username: string | null;
    login: (username: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    
    useEffect(() => {
        const id = localStorage.getItem('id');
        const username = localStorage.getItem('username');
        if (id !== null && username !== null) {
            setUserId(parseInt(id));
            setUsername(username);
        }
    }, [])
    const login = async (username: string) => {
        console.log(username);
        const response = await fetch('http://localhost:5000/api/authenticate', {
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            setUserId(data.userId);
            setUsername(data.username);
            localStorage.setItem('id', data.userId);
            localStorage.setItem('username', data.username);
        }
    };

    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        setUserId(null);
        setUsername(null);
        window.location.reload();   
    };

    return (
        <AuthContext.Provider value={{ userId, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};