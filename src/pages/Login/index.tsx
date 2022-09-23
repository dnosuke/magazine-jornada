import { Box, Button, FormControl, Link, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../shared/contexts";
import userRegister from "../../shared/store/userRegister";

interface ILoginProps {
  children: React.ReactNode;
}
type FormData = {
  email: string;
  password: string;
};

const Login: React.FC<ILoginProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthContext();
  const { userLogin } = userRegister();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {
    await login(data.email, data.password);
    userLogin(data.email);
  });

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      style={{ backgroundColor: "#1111" }}
    >
      <Box
        height="80%"
        width="50%"
        alignSelf={"center"}
        display={"flex"}
        borderRadius="2%"
        style={{ backgroundColor: "white" }}
      >
        <Box
          width="50%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          style={{ backgroundColor: "#285ec4" }}
        >
          <iframe
            title="shop"
            height="100%"
            width="100%"
            src="https://embed.lottiefiles.com/animation/66358"
          ></iframe>
        </Box>
        <Box
          height="100%"
          width="50%"
          display="flex"
          flexDirection={"column"}
          alignSelf={"center"}
          justifyContent="space-around"
          gap={1}
        >
          <Box
            width="70%"
            display="flex"
            flexDirection={"column"}
            alignSelf={"center"}
            textAlign="center"
            marginTop={6}
            gap={1}
          >
            <h1>Bem-vindo</h1>
            <span>Lorem ipsum dolor sit amet, consectetur adipisci elit</span>
            <form onSubmit={onSubmit}>
              <FormControl fullWidth sx={{ gap: 2 }}>
                <Controller
                  name={"email"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      type={"email"}
                      error={errors.email ? true : false}
                      helperText={errors.email ? "Preencha este campo" : ""}
                      {...register("email", { required: true })}
                      value={value}
                      label={"E-mail"}
                    />
                  )}
                />
                <Controller
                  name={"password"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      type="password"
                      error={errors.password ? true : false}
                      helperText={errors.password ? "Preencha este campo" : ""}
                      {...register("password", { required: true })}
                      value={value}
                      label={"Senha"}
                    />
                  )}
                />
                <Link
                  component="button"
                  variant="body2"
                  underline="none"
                  textAlign={"left"}
                  onClick={() => {
                    console.info("Esqueci a senha");
                  }}
                >
                  Esqueceu a senha?
                </Link>
                <Button color="info" variant="contained" type="submit">
                  Login
                </Button>
              </FormControl>
            </form>
          </Box>
          <Box alignSelf="center">
            Não tem uma conta ainda?{" "}
            <Link
              component="button"
              variant="body2"
              underline="none"
              onClick={() => navigate("/signup", { state: "" })}
            >
              Cadastre-se
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
