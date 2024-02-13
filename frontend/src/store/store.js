import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageSlice'
import eventsReducer from './eventsSlice'
import amdinReducer from './adminSlice'
import { api } from "./api"

export const store = configureStore({
    reducer: {
        page: pageReducer,
        events: eventsReducer,
        admin: amdinReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})