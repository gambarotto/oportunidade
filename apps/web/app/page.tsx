"use client";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useDispatch } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
import { getUserLocalStorage, signIn, useAppSelector } from "../redux/features/user/userSlice"
import SignIn from "./(auth)/signIn/page";
import Todo from "./todo/page";

const queryClient = new QueryClient();
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLocalStorage());

  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
