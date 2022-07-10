export interface Todo {
    uid: string;
    content: string;
    lastTouchedAt: string;
}

export interface TodoPayload {
    content: string;
}

export interface Response {
    success: Boolean;
    message: string | null;
    data: any;
}

export interface allTodoResponse extends Response {
    data: Todo[];
}

export interface createTodoResponse extends Response {
    data: Todo;
}

// const baseUrl: string = 'http://localhost:8080/api/v1'
const baseUrl: string = 'https://spring-services-todo-app.herokuapp.com/api/v1'

export const getAllTodos = async (): Promise<allTodoResponse> => {
    return (await fetch(`${baseUrl}/todos/`, { method: 'GET' })).json();
}

export const createTodo = async (payload: TodoPayload): Promise<createTodoResponse> => {
    return (await fetch(`${baseUrl}/todos/`, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })).json();
}

export const updateTodo = async (payload: Todo): Promise<Response> => {
    return (await fetch(`${baseUrl}/todos/`, { method: 'PUT', body: JSON.stringify(payload) })).json();
}

export const deleteTodo = async (uid: string): Promise<Response> => {
    return (await fetch(`${baseUrl}/todos/${uid}`, { method: 'DELETE' })).json();
}