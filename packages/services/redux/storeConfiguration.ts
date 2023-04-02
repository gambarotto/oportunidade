import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { apiSlice } from './features/reduxApi';
import { UserStateProps } from "./features/user/userSlice";
import userReducer from './features/user/userSlice';
import { TypedUseSelectorHook, useSelector } from "react-redux";

export type RootState = {
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
  user: UserStateProps;
};

export const configurationStore = {
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
}

export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector