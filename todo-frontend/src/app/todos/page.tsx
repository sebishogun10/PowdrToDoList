'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import TodoList from '@/components/TodoList';

export default function Todos() {
    const { isAuthenticated, username, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Welcome, {username}!
                            </h1>
                            <p className="text-lg text-gray-600">
                                Here&apos;s your todo list
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors duration-200 text-base font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            
            <main className="max-w-5xl mx-auto px-4 py-8">
                <TodoList />
            </main>
        </div>
    );
}
