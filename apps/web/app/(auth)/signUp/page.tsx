'use client'
import { Grid, Link, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { reduxApi, signUpApi } from "@infor/services";


import { useDispatch } from "react-redux";
import { ButtonContainer, Input } from "@infor/ui";

export default function SignUp () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [createUser] = reduxApi.user.useCreateUserMutation()

  const handleSignIn = useCallback( () => {
    const user = signUpApi({ name, email, password });
    createUser(user)
    router.push('/signIn')
  }, [createUser, email, name, password, router]);

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
          <ButtonContainer 
            variant="contained" 
            size="large" 
            style={{ marginTop: 24 }}
            onClick={handleSignIn}
            >
            Criar conta
          </ButtonContainer>
        </Stack>
        <Stack justifyContent="center" alignItems="flex-end" width="50ch">
          <Link
            href={"/signIn"}
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