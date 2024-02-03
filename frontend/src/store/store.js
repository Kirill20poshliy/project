import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageSlice'
import eventsReducer from './eventsSlice'
import { api } from "./api"

export const store = configureStore({
    reducer: {
        page: pageReducer,
        events: eventsReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})