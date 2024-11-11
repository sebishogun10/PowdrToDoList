'use client';

import { useState } from 'react';
import { Todo } from '@/types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, title: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onUpdate(todo.id, title);
            setIsEditing(false);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border-2 border-gray-100">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="flex-1 mr-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        autoFocus
                    />
                </form>
            ) : (
                <div className="flex items-center flex-1">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                        className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 text-blue-600"
                    />
                    <span className={`ml-4 text-lg ${
                        todo.completed 
                            ? 'line-through text-gray-500 font-medium' 
                            : 'text-gray-900 font-semibold'
                    }`}>
                        {todo.title}
                    </span>
                </div>
            )}
            <div className="flex space-x-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
