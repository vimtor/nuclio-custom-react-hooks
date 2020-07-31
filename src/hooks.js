import { useEffect, useState } from "react";
import axios from "axios";
import { v4 }  from "uuid";

const API_TODO = 'https://jsonplaceholder.typicode.com/todos';

export const useTasks = ({ offset = 5 }) => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios.get(API_TODO + `?_start=${page}&_limit=${offset}`).then(res => setTasks(res.data));
    }, [page, offset]);

    const addTask = async (title) => {
        const data = {
            id: v4(),
            title,
            completed: false
        }

        await axios.post(API_TODO, data)
        setTasks([...tasks, data])
    };

    const removeTask = async (id) => {
        await axios.delete(`${API_TODO}/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const loadMore = async () => {
        const { data } = await axios.get(API_TODO + `?_start=${page + offset}&_limit=${offset}`);
        setTasks([...tasks, ...data])
        setPage(page + 5);
    };

    return {
        tasks,
        addTask,
        removeTask,
        loadMore
    }
};
