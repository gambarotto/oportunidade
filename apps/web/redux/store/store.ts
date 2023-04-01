import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice';
import taskReducer from '../features/task/taskSlice';

export const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch