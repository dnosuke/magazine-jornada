import {
  Box,
  Button,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
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
      justifyContent="center"
      alignItems={"center"}
    >
      <Box
        height={"80%"}
        maxWidth={360}
        borderRadius="2%"
        style={{ backgroundColor: "white" }}
      >
        <Box>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            textAlign={"center"}
          >
            Magazine Jornada
          </Typography>
        </Box>
        <Box>
          <Box>
            <span>Lorem ipsum dolor sit amet, consectetur adipisci elit</span>
            <Typography gutterBottom variant="h6" component="div">
              Cadastro
            </Typography>
            <form onSubmit={onSubmit}>
              <FormControl fullWidth sx={{ gap: 2 }}>
                <Controller
                  name={"email"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="email-login"
                      type={"email"}
                      error={errors.email ? true : false}
                      helperText={errors.email ? "Preencha este campo" : ""}
                      {...register("email", { required: true })}
                      value={value}
                      label={"E-mail"}
                      autoComplete="email"
                    />
                  )}
                />
                <Controller
                  name={"password"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="senha-login"
                      type="password"
                      error={errors.password ? true : false}
                      helperText={errors.password ? "Preencha este campo" : ""}
                      {...register("password", { required: true })}
                      value={value}
                      label={"Senha"}
                      autoComplete="current-password"
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
          <Box alignSelf="center" mt={2}>
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
