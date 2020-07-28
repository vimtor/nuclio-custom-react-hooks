import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid'

const API_HOST = 'https://jsonplaceholder.typicode.com';
const API_TODO = `${API_HOST}/todos`;

export const useTasks = ({ offset }) => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(offset);

    useEffect(() => {
        axios.get(`${API_TODO}?_start=${0}&_limit=${page}`)
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

    const loadMore = async () => {
        const { data } = await axios.get(`${API_TODO}?_start=${page}&_limit=${page}`)

        setPage(page + offset);
        setTasks([...tasks, ...data]);
    }

    return {
        tasks,
        addTask,
        removeTask,
        loadMore
    }
};
