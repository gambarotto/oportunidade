"use client";
import { Button, Container, Grid, Stack, TextField, Typography, Link, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//import Link from "next/link";
import { ButtonContainer, ButtonOutline, ButtonText } from "ui";
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
          <Typography variant="h2" fontFamily="roboto" color="WindowText" marginBottom={2}>
            Login
          </Typography>
          <Typography
            variant="subtitle1"
            marginBottom={1}
            fontFamily="roboto"
            color="gray"
            style={{fontSize: 14}}
          >
            Seja bem vindo, faça login para acessar sua lista
          </Typography>
        </Stack>

        <FormControl
          sx={{ m: 1, width: "50ch" }}
          variant="outlined"
          color="info"
        >
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput id="email" type="email" fullWidth label="Email" />
        </FormControl>
        <FormControl
          sx={{ m: 1, width: "50ch", marginBottom: 4 }}
          variant="outlined"
          color="info"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={"password"}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {}}
                  onMouseDown={() => {}}
                  edge="end"
                >
                  {true ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Stack
          direction="column"
          justifyContent="flex-end"
          marginBottom={2}
          width="50ch"
        >
          <Button variant="contained" size="large">
            Entrar
          </Button>
        </Stack>
        <Stack justifyContent="center" alignItems="flex-end" width="50ch">
          <Link href={""} underline="none" fontFamily="roboto" style={{fontSize: 14}}>
            {"Não possui uma conta?"}
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}
