import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/gameslice'
import userReducer from './slices/userslice'

export const store = configureStore({
    reducer: {
        game: gameReducer,
        user: userReducer,
    },
})