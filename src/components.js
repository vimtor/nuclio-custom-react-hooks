import React, { useState } from "react";

export const TaskList = ({ children }) => (
    <ul>{children}</ul>
)

export const TaskItem = ({ title, completed, onRemove }) => (
    <li>
        <input type="checkbox" checked={completed} />
        <p>{title}</p>
        <span onClick={onRemove}>X</span>
    </li>
)

export const Input = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit(value);
            setValue('');
        }}>
            <input placeholder="buy milk" onChange={e => setValue(e.target.value)} value={value}/>
        </form>
    );
}

export const Controls = ({ onLoad, tasks }) => (
    <footer>
        <div>
            <strong>{tasks.filter((task) => !task.completed).length}</strong> tasks left.
        </div>
        <button onClick={onLoad}>Load More</button>
    </footer>
);
