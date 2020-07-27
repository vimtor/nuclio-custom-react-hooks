import React, {useState} from 'react';
import {useTasks} from "./hooks";

const App = () => {
    const { tasks, addTask, removeTask } = useTasks();
    const [title, setTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        addTask(title);
        setTitle('');
    }

    return (
        <div>
            <h1>What do you want to do today?</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="buy milk" onChange={e => setTitle(e.target.value)} value={title} />
            </form>
            <ul>
                {tasks.map(({ id, title }) => (
                    <li key={id}>
                        <input type="checkbox" />
                        <p>{title}</p>
                        <button onClick={() => removeTask(id)}>X</button>
                    </li>
                ))}
            </ul>
            <footer>
                <strong>{tasks.filter((task) => !task.checked).length}</strong> tasks left.
            </footer>
        </div>
    );
};

export default App;
