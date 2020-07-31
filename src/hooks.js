import { useEffect, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const useTasks = ({ offset } = { offset: 5 }) => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        api.get('/todos', {
            params: {
                _start: page,
                _limit: offset,
            }
        })
            .then(res => setTasks(res.data));
    }, []);

    const addTask = async (title) => {
        const data = {
            id: v4(),
            title,
            completed: false
        }

        await api.post('/todos', data)
        setTasks([...tasks, data])
    };

    const removeTask = async (id) => {
        await api.delete(`/todos/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const loadMore = async () => {
        const { data } = await api.get('/todos', {
            params: {
                _start: page + offset,
                _limit: offset,
            }
        });

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
