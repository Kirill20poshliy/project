import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        login: null,
        token: null,
        id: null,
    },
    reducers: {

        setCredentials(state, action) {
            const {data, accessToken} = action.payload
            state.login = data.login
            state.token = accessToken
            state.id = data.adminId
        },

        logout(state, action) {
            state.login = null
            state.token = null
            state.id = null
        },

    }
})

export const {
    setCredentials,
    logout,
} = adminSlice.actions

export default adminSlice.reducer

export const selectCurrentToken = (state) => state.admin.token
export const selectCurrentEmail = (state) => state.admin.login