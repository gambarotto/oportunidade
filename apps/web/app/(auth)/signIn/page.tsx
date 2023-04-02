'use client'
import { reduxApi, signInApi } from "@infor/services";
import { ButtonContainer, Input } from "@infor/ui";
import { Grid, Link, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function SignIn () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [createSession, result] = reduxApi.user.useCreateSessionMutation();
  const dispatch = useDispatch();
  
  const handleSignIn = useCallback(async () => {
    const user = signInApi({ email, password });
    const session = await createSession(user).unwrap()
    console.log(session);
    
    //dispatch(reduxApi.user.signIn(session))
    router.push("/todo");
  }, [createSession, dispatch, email, password, router]);

  const successLogin = useCallback(() => {
    router.push("/todo");
    dispatch(reduxApi.user.signIn(result.data))
  }, [dispatch, result.data, router]);

  if (result.isSuccess) {
    //successLogin()
  }
  if (result.isError) {
    console.log("erro ao logar");
  }
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
            Login
          </Typography>
          <Typography
            variant="subtitle1"
            marginBottom={1}
            fontFamily="roboto"
            color="gray"
            style={{ fontSize: 14 }}
          >
            Seja bem vindo, faça login para acessar sua lista
          </Typography>
        </Stack>
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
          inputText="Senha"
          inputLabel="senha"
          inputWidth="50ch"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Stack
          direction="column"
          justifyContent="flex-end"
          marginBottom={2}
          width="50ch"
        >
          <ButtonContainer
            onClick={handleSignIn}
            variant="contained"
            size="large"
            style={{ marginTop: 24 }}
          >
            Entrar
          </ButtonContainer>
        </Stack>
        <Stack justifyContent="center" alignItems="flex-end" width="50ch">
          <Link
            href={"/signUp"}
            underline="none"
            fontFamily="roboto"
            style={{ fontSize: 14 }}
          >
            {"Não possui uma conta?"}
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}