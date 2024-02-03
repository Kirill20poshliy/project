import { createSlice } from "@reduxjs/toolkit"

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        count: null,
    },
    reducers: {

        setEvents(state, action) {
            state.events = action.payload.data
            state.count = action.payload.count
        }

    }
})

export const {
    setEvents,
} = eventsSlice.actions

export default eventsSlice.reducer