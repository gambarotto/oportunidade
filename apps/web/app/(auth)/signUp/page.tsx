'use client'
import { Button, Grid, Link, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { signUpApi } from "@infor/services";

import Input from "../../../components/Input";
import { useDispatch } from "react-redux";
import { signUp } from '../../../redux/features/user/userSlice';

export default function SignUp () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = useCallback(async () => {
    const user = await signUpApi({ name, email, password });
    dispatch(signUp({ user }));
    
  }, [dispatch, email, name, password]);

  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Grid
        container
        maxWidth="sm"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Stack width="50ch" alignItems="flex-start">
          <Typography
            variant="h2"
            fontFamily="roboto"
            color="WindowText"
            marginBottom={2}
          >
            Sign Up
          </Typography>
          <Typography
            variant="subtitle1"
            marginBottom={1}
            fontFamily="roboto"
            color="gray"
            style={{ fontSize: 14 }}
          >
            Oba! será maravilhoso ter você com a gente!
          </Typography>
        </Stack>
        <Stack>
          <Input
            inputId="name"
            inputType="name"
            inputWidth="50ch"
            inputText="Nome"
            inputLabel="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            inputId="email"
            inputType="email"
            inputWidth="50ch"
            inputText="E-mail"
            inputLabel="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            inputId="password"
            inputType="password"
            inputWidth="50ch"
            inputText="Senha"
            inputLabel="senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-end"
          marginBottom={2}
          width="50ch"
        >
          <Button 
            variant="contained" 
            size="large" 
            style={{ marginTop: 24 }}
            onClick={handleSignIn}
            >
            Entrar
          </Button>
        </Stack>
        <Stack justifyContent="center" alignItems="flex-end" width="50ch">
          <Link
            href={"/"}
            underline="none"
            fontFamily="roboto"
            style={{ fontSize: 14 }}
          >
            {"Voltar para login"}
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}