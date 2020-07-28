import React from "react";

export const TaskList = ({ children }) => (
    <ul>{children}</ul>
)

export const TaskItem = ({ title, completed, onRemove }) => (
    <li>
        <input type="checkbox" checked={completed}/>
        <p>{title}</p>
        <span onClick={onRemove}>X</span>
    </li>
)

export const Input = ({ onSubmit, onChange, value }) => (
    <form onSubmit={onSubmit}>
        <input placeholder="buy milk" onChange={e => onChange(e.target.value)} value={value}/>
    </form>
)

export const Controls = ({ onLoad, tasks }) => (
    <footer>
        <div>
            <strong>{tasks.filter((task) => !task.completed).length}</strong> tasks left.
        </div>
        <button onClick={onLoad}>Load More</button>
    </footer>
);
