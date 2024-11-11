'use client';

import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api';
import { Todo } from '@/types';
import TodoItem from './TodoItem';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            setError('Failed to fetch todos');
            console.error('Fetch todos error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const todo = await createTodo(newTodo);
            setTodos(prevTodos => [...prevTodos, todo]);
            setNewTodo('');
        } catch (error) {
            setError('Failed to create todo');
            console.error('Create todo error:', error);
        }
    };

    const handleToggle = async (id: number) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        try {
            await updateTodo(id, todo.title, !todo.completed);
            setTodos(prevTodos => prevTodos.map(t => 
                t.id === id ? { ...t, completed: !t.completed } : t
            ));
        } catch (error) {
            setError('Failed to update todo');
            console.error('Toggle todo error:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
        } catch (error) {
            setError('Failed to delete todo');
            console.error('Delete todo error:', error);
        }
    };

    const handleUpdate = async (id: number, title: string) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        try {
            await updateTodo(id, title, todo.completed);
            setTodos(prevTodos => prevTodos.map(t => 
                t.id === id ? { ...t, title } : t
            ));
        } catch (error) {
            setError('Failed to update todo');
            console.error('Update todo error:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new task"
                        className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500"
                    />
                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors"
                    >
                        Add
                    </button>
                </div>
            </form>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-900 text-lg font-medium">
                    <div className="flex justify-between items-center">
                        <span>{error}</span>
                        <button 
                            onClick={() => setError('')}
                            className="text-red-900 hover:bg-red-100 rounded-full p-1 transition-colors"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {todos.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-xl text-gray-600">No tasks yet. Add one above!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
