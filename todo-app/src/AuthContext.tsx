import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface AuthContextType {
    userId: number | null;
    username: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    
    useEffect(() => {
        const id = localStorage.getItem('id');
        const username = localStorage.getItem('username');
            setUserId(parseInt(id!));
            setUsername(username);
        
    }, [])
    const login = async (username: string, password: string) => {
        const response = await fetch('http://localhost:5000/api/login', {
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })

        if (response.ok) {
            const data = await response.json();
            setUserId(data.id);

            setUsername(data.username);
            localStorage.setItem('id', data.id);
            localStorage.setItem('username', data.username);
        }
    };
    const register = async (username: string, password: string) => {
        const response = await fetch('http://localhost:5000/api/register', {
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        if (response.ok) {
            const data = await response.json();
            setUserId(data.id);
            setUsername(data.username);
            localStorage.setItem('id', data.id);
            localStorage.setItem('username', data.username);
        }
    }
    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        setUserId(null);
        setUsername(null);
        window.location.reload();   
    };

    return (
        <AuthContext.Provider value={{ userId, username, login, logout, register }}>
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