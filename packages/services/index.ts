import api from "./api";
import { signUpApi, signInApi } from "./user";
import { configurationStore } from './redux/storeConfiguration';
import { 
  useTasksQuery, 
  useAddTaskMutation, 
  useUpdateTaskMutation, 
  useDeleteTaskMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useCreateSessionMutation 
} from './redux/features/reduxApi';
import { getUserLocalStorage, selectUser, signIn } from './redux/features/user/userSlice';

const reduxApi = {
  configurationStore,
  tasks: {
    useTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
  },
  user: {
    getUserLocalStorage,
    useCreateUserMutation,
    useUpdateUserMutation,
    useGetUserQuery,
    selectUser, 
    useCreateSessionMutation,
    signIn
  },
}

export { 
  api, 
  signUpApi, 
  signInApi,
  reduxApi
}