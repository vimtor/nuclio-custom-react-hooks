import React from "react";

export const TaskList = ({ children }) => (
    <ul>{children}</ul>
)

export const TaskItem = ({ title, onRemove }) => (
    <li>
        <input type="checkbox"/>
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
    <>
        <button onClick={onLoad}>Load More</button>
        <footer>
            <strong>{tasks.filter((task) => !task.checked).length}</strong> tasks left.
        </footer>
    </>
);
