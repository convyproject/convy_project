import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'src/store/reducers/auth'
import pathReducer from 'src/store/reducers/path'

export const store = configureStore({
  reducer: {
    path: pathReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
