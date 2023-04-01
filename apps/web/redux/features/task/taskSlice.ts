import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export interface TaskStateProps {
    id: string;
    content: string,
    done: boolean,
    userId: string,
}
interface InitialStateProps {
  tasks: TaskStateProps[]
}
const initialState: InitialStateProps = {
  tasks: []
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getAllTasks: (state, { payload }: PayloadAction<TaskStateProps[]>) => {
      state.tasks = payload
    },
    addTask: (state, { payload }: PayloadAction<TaskStateProps>) => {
      state.tasks.push(payload)
    },
    updateReduxTask: (state, { payload }: PayloadAction<TaskStateProps>) => {
      const findIndex = state.tasks.findIndex(
        findTask => findTask.id === payload.id,
      );
      state.tasks[findIndex] = payload;
    },
    deleteReduxTask: (state, { payload }: PayloadAction<TaskStateProps>) => {
      state.tasks = state.tasks.filter(item => item.id !== payload.id)
    }
  },
})

// Action creators are generated for each case reducer function
export const { getAllTasks, addTask, updateReduxTask, deleteReduxTask } = taskSlice.actions
export const useAppSelectorTask: TypedUseSelectorHook<TaskStateProps[]> = useSelector
export default taskSlice.reducer