import React from 'react';
import { Input, TaskItem, TaskList, Controls } from "./components";
import TaskProvider, { useTasks } from "./hooks";

const TaskPage = () => {
    const { tasks, addTask, removeTask } = useTasks({ offset: 5 });

    return (
        <section>
            <h1>What do you want to do today?</h1>
            <Input onSubmit={addTask}/>
            <TaskList>
                {tasks.map(({ id, title, completed }) => (
                    <TaskItem key={id} title={title} completed={completed} onRemove={() => removeTask(id)}/>
                ))}
            </TaskList>
            <Controls />
        </section>
    );
};

const App = () => {
    return (
        <TaskProvider>
            <TaskPage/>
        </TaskProvider>
    )
}

export default App;
