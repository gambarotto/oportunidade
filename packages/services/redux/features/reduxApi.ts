import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { tasksEndpoints } from "./tasks/endpoints";
import { userEndpoints } from "./user/endpoints";
import { RootState } from '../storeConfiguration';

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["user","tasks"],
  endpoints: (builder) => (
      {
        ...tasksEndpoints(builder),
        ...userEndpoints(builder),
      }
    )
})

export const {
  useTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useCreateSessionMutation,
  
} = apiSlice;