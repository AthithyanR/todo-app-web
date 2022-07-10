import React from "react";
import { Todo } from "./api";

interface todoComponentType {
    todo: Todo;
    delTodo: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TodoComponent(props: todoComponentType)  {
    const { todo, delTodo } = props;

    return (
        <div key={todo.uid} className="todo-element">
            <p className="todo-element-content">{todo.content}</p>
            <button className="todo-delete-btn" type="button" name={todo.uid} onClick={delTodo}>X</button>
        </div>
    );

}