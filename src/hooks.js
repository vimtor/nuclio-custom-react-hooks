import { useEffect, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";

const API_TODO = 'https://jsonplaceholder.typicode.com/todos';

export const useTasks = ({ offset = 5 }) => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios.get(API_TODO, {
            params: {
                _start: page,
                _limit: offset,
            }
        })
            .then(({ data, status }) => {
                if (status === 200) {
                    setTasks(data);
                }
            })
            .catch(err => {
                console.error(err);
                // Show error popup
            })
    }, []);

    const addTask = async (title) => {
        const id = v4();
        const data = {
            id,
            title,
            completed: false
        }

        setTasks([...tasks, data])

        const { status } = await axios.post(API_TODO, data)

        if (status !== 201) {
            setTasks(tasks.filter((task) => task.id !== id));
        }
    };

    const removeTask = async (id) => {
        const task = tasks.find(task => task.id === id);
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);

        const { status } = await axios.delete(`${API_TODO}/${id}`);

        if (status !== 200) {
            setTasks([...newTasks, task]);
        }
    };

    const loadMore = async () => {
        const { data, status } = await axios.get(API_TODO, {
            params: {
                _start: page + offset,
                _limit: offset,
            }
        });

        if (status === 200) {
            setTasks([...tasks, ...data])
            setPage(page + 5);
        }
    };

    return {
        tasks,
        addTask,
        removeTask,
        loadMore
    }
};
