import { createSlice } from "@reduxjs/toolkit";


export const TodoSlice = createSlice({
    name: 'todo',
    initialState: {
        columns: [
            { id: 'inbox', title: 'inbox' },
            { id: 'todo', title: 'Todo Tasks' },
            { id: 'inprogress', title: 'In Progress' },
            { id: 'completed', title: 'Completed' }
        ],
        inbox: [],
        todosList: [],
        inProgressTodos: [],
        completedTodos: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.inbox.push(action.payload)
        },
        moveTodo: (state, action) => {
            const { taskId, from, to } = action.payload

            let task

            if (from === 'inbox') {
                const idx = state.inbox.findIndex(t => t.id === taskId)
                if (idx !== -1) task = state.inbox.splice(idx, 1)[0]
            } else if (from === 'todo') {
                const idx = state.todosList.findIndex(t => t.id === taskId)
                if (idx !== -1) task = state.todosList.splice(idx, 1)[0]
            } else if (from === 'inprogress') {
                const idx = state.inProgressTodos.findIndex(t => t.id === taskId)
                if (idx !== -1) task = state.inProgressTodos.splice(idx, 1)[0]
            } else if (from === 'completed') {
                const idx = state.completedTodos.findIndex(t => t.id === taskId)
                if (idx !== -1) task = state.completedTodos.splice(idx, 1)[0]
            }

            if (task) {
                if (to === 'todo') state.todosList.push(task)
                if (to === 'inprogress') state.inProgressTodos.push(task)
                if (to === 'completed') state.completedTodos.push(task)
            }
        },
        removeTodo: (state, action) => {
            const { todoId, from } = action.payload
            if (from === 'inbox') {
                state.inbox = state.inbox.filter(t => t.id !== todoId)
            } else if (from === 'completed') {
                state.completedTodos = state.completedTodos.filter(t => t.id !== todoId)
            }
        },
        updateTodo: (state, action) => {
            const { todoId, updates, from } = action.payload

            
            const listMap = {
                inbox: 'inbox',
                todo: 'todosList',
                inprogress: 'inProgressTodos',
                completed: 'completedTodos'
            };

            const listKey = listMap[from]
            const list = state[listKey]

            if (list && Array.isArray(list)) {
                const idx = list.findIndex(todo => todo.id === todoId)
                if (idx !== -1) {
                    Object.assign(list[idx], updates)
                }
            } else {
                console.warn(`Cannot update todo: state[${listKey}] is not a valid array.`);
            }
        }

    }
})

export const { addTodo, moveTodo, removeTodo, updateTodo } = TodoSlice.actions
export const todoReducer = TodoSlice.reducer