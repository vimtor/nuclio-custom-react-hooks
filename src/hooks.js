import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid'

const API_HOST = 'https://jsonplaceholder.typicode.com';
const API_TODO = `${API_HOST}/todos`;

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`${API_TODO}?_start=0&_limit=5`)
            .then(({ data, status }) => {
                if (status === 200) {
                    setTasks(data);
                }
            })
            .catch(console.error)

    }, []);

    const addTask = async (title) => {
        const data = {
            title,
            id: uuid(),
            completed: false
        }

        await axios.post(API_TODO, data);

        setTasks([data, ...tasks]);
    }

    const removeTask = async (id) => {
        await axios.delete(`${API_TODO}/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return {
        tasks,
        addTask,
        removeTask
    }
};
