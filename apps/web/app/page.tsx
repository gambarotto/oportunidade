"use client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useDispatch } from "react-redux";
import { reduxApi } from "@infor/services"
import SignIn from "./(auth)/signIn/page";
import Todo from "./todo/page";
import { useTypedSelector } from "../redux/store/store";

const queryClient = new QueryClient();
export default function Home() {
  const state = useTypedSelector((state: any) => state)
  const dispatch = useDispatch();

  useEffect(() => {
    const data = reduxApi.user.getUserLocalStorage();
    dispatch(data);
  }, [dispatch]);

  if(state.user.isLoading){
    return <h1>carregando...</h1>
  }
  return <>{state.user.token ? <Todo /> : <SignIn />}</>;
}
