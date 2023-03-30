"use client";
import { signInApi } from "@infor/services";
import { ButtonContainer, Input } from "@infor/ui";
import { Grid, Stack, Typography, Link } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useDispatch } from "react-redux";

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
    </QueryClientProvider>
    
  );
}
