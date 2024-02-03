import { createSlice } from "@reduxjs/toolkit"

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        siderCollapse: true,
        colorBg: null,
        borderRadius: null,
    },
    reducers: {

        setParams(state, action) {
            state.colorBg = action.payload.colorBg
            state.borderRadius = action.payload.borderRadius
        },

        switchSider(state, action) {
            state.siderCollapse = state.siderCollapse ? false : true
        },

    }
})

export const {
    setParams,
    switchSider,
} = pageSlice.actions

export default pageSlice.reducer