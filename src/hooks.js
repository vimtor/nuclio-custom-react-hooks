import React from 'react';
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";

const TaskContext = createContext(null);

const reducer = (tasks, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'ADD':
            if (Array.isArray(action.payload)) {
                return [...tasks, ...action.payload];
            }
            return [...tasks, action.payload];
        case 'REMOVE':
            return tasks.filter((task) => task.id !== action.payload)

    }
}

const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(reducer, []);

    return (
        <TaskContext.Provider value={[tasks, dispatch]}>
            {children}
        </TaskContext.Provider>
    )
}

const API_TODO = 'https://jsonplaceholder.typicode.com/todos';

const useTasks = ({ offset } = { offset: 5 }) => {
    const context = useContext(TaskContext);
    const [page, setPage] = useState(0);

    if (!context) {
        throw new Error('useTasks must be used within TaskProvider')
    }

    const [tasks, dispatch] = context;

    useEffect(() => {
        axios.get(API_TODO, {
            params: {
                _start: page,
                _limit: offset,
            }
        })
            .then(({ data }) => dispatch({ type: 'SET', payload: data }));
    }, []);

    const addTask = async (title) => {
        const data = {
            id: v4(),
            title,
            completed: false
        }

        await axios.post(API_TODO, data)
        dispatch({ type: 'ADD', payload: data })
    };

    const removeTask = async (id) => {
        await axios.delete(`${API_TODO}/${id}`);
        dispatch({ type: 'REMOVE', payload: id })
    };

    const loadMore = async () => {
        const { data } = await axios.get(API_TODO, {
            params: {
                _start: page + offset,
                _limit: offset,
            }
        });

        setPage(page + 5);
        dispatch({ type: 'ADD', payload: data })
    };

    return {
        tasks,
        addTask,
        removeTask,
        loadMore
    }
};

export { useTasks };
export default TaskProvider;
