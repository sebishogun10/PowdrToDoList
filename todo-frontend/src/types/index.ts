export interface User {
    id: number;
    username: string;
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface AuthResponse {
    token: string;
    user: User;
}
