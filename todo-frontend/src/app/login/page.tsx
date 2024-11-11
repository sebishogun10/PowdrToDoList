'use client';

import { useState } from 'react';
import { login } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            authLogin(response.token, username);
        } catch (error) {
            setError('Invalid username or password');
            console.error('Login error:', error);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Welcome Back</h1>
                
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-900 font-medium rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-lg font-semibold text-gray-900 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg text-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-semibold text-gray-900 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg text-gray-900"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200 text-lg font-semibold"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600 text-lg">
                    Don&apos;t have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                        Register here
                    </a>
                </p>
            </div>
        </main>
    );
}
