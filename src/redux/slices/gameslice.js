import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'freefire',
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        toggleToFF: (state) => {
            state.value = 'freefire'
        },
        toggleToBC: (state) => {
            state.value = 'blackclover'
        },
    },
})


export const { toggleToFF, toggleToBC } = gameSlice.actions

export default gameSlice.reducer