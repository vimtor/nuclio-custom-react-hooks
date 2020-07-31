import React from 'react';
import { Input, TaskItem, TaskList, Controls } from "./components";
import { useTasks } from "./hooks";

const App = () => {
    const { tasks, toggleTask, addTask, removeTask, loadMore } = useTasks({ offset: 5 });

    return (
        <section>
            <h1>What do you want to do today?</h1>
            <Input onSubmit={addTask} />
            <TaskList>
                {tasks.map(({ id, title, completed }) => (
                    <TaskItem
                        key={id}
                        title={title}
                        completed={completed}
                        onCheck={() => toggleTask(id)}
                        onRemove={() => removeTask(id)}
                    />
                ))}
            </TaskList>
            <Controls tasks={tasks} onLoad={loadMore} />
        </section>
    );
};

export default App;
