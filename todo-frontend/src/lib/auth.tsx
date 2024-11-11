'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    username: null,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check for existing auth on mount
        const token = Cookies.get('token');
        const savedUsername = Cookies.get('username');
        
        if (token && savedUsername) {
            setIsAuthenticated(true);
            setUsername(savedUsername);
        }
    }, []);

    const login = (token: string, username: string) => {
        // Set cookies with 7 days expiry
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('username', username, { expires: 7 });
        setIsAuthenticated(true);
        setUsername(username);
        router.push('/todos');
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('username');
        setIsAuthenticated(false);
        setUsername(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
