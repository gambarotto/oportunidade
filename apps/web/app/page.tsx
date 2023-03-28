"use client";
import { Button, Grid, Stack, Typography, Link } from "@mui/material";
import Input from "../components/Input";

export default function Home() {
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
          onChange={() => {}}
        />
        <Input
          inputId="password"
          inputType="password"
          inputText="Senha"
          inputLabel="senha"
          inputWidth="50ch"
        />
        <Stack
          direction="column"
          justifyContent="flex-end"
          marginBottom={2}
          width="50ch"
        >
          <Button variant="contained" size="large" style={{ marginTop: 24 }}>
            Entrar
          </Button>
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
