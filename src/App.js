import React, { useState } from 'react';
import { useTasks } from "./hooks";
import { Input, TaskItem, TaskList, Controls } from "./components";

const App = () => {
    const { tasks, addTask, removeTask, loadMore } = useTasks({ offset: 5 });
    const [title, setTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        addTask(title);
        setTitle('');
    }

    return (
        <section>
            <h1>What do you want to do today?</h1>
            <Input onSubmit={handleSubmit} onChange={setTitle} value={title} />
            <TaskList>
                {tasks.map(({ id, title, completed }) => (
                    <TaskItem key={id} title={title} completed={completed} onRemove={() => removeTask(id)}/>
                ))}
            </TaskList>
            <Controls onLoad={loadMore} tasks={tasks} />
        </section>
    );
};

export default App;
