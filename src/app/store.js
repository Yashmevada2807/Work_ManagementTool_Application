import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todoReducer } from "../features/todos/todoSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const todoPersistConfig = {
    key: 'Todos',
    storage
}

const rootReducer = combineReducers({
    todos: persistReducer(todoPersistConfig, todoReducer)
})


export const store = configureStore({
    reducer: rootReducer
})

export const persistor = persistStore(store)