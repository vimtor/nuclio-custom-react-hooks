import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid'

const API_HOST = 'https://jsonplaceholder.typicode.com';
const API_TODO = `${API_HOST}/todos`;

export const useTasks = ({ offset = 5 }) => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(offset);

    useEffect(() => {
        axios.get(`${API_TODO}?_start=${0}&_limit=${offset}`)
            .then(({ data, status }) => {
                if (status === 200) {
                    setTasks(data);
                }
            })
            .catch(console.error)

    }, [offset]);

    const addTask = async (title) => {
        const data = {
            id: uuid(),
            title,
            completed: false
        }

        await axios.post(API_TODO, data);

        setTasks([...tasks, data]);
    }

    const removeTask = async (id) => {
        await axios.delete(`${API_TODO}/${id}`);

        setTasks(tasks.filter((task) => task.id !== id));
    }

    const loadMore = async () => {
        const { data } = await axios.get(`${API_TODO}?_start=${page}&_limit=${offset}`)

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
