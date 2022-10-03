import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import popupSlice from './slices/popupSlice'
import tweetSlice from './slices/tweetSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tweet: tweetSlice,
    popup: popupSlice
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch