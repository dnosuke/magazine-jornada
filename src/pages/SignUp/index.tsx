import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../shared/contexts";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IUser } from "../../types/user";

type Inputs = {
  userType: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  profilePicture: string;
};

function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuthContext();
  const [userType, setUserType] = useState<string>("CUSTOMER");
  const [user, setUser] = useState<IUser>();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.userType = user?.userType || "CUSTOMER";
    data.profilePicture = user?.profilePicture || "img.png";
    const obj: Partial<Inputs> = data;
    delete obj.confirm_password;
    console.log(obj);
    signup(obj as IUser);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value as string);
    setUser({ ...user, userType: event.target.value } as IUser);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    } else {
      setUser({ ...user, profilePicture: e.target.files[0].name } as IUser);
    }
  };

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
          <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
            Magazine Jornada
          </Typography>
        </Box>
        <Box>
          <Box>
            <Typography gutterBottom variant="h6" component="div">
              Cadastro
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ gap: 2 }}>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={userType}
                  defaultValue={"CUSTOMER"}
                  label="Tipo"
                  onChange={handleChange}
                >
                  <MenuItem value={"CUSTOMER"}>Cliente</MenuItem>
                  <MenuItem value={"PARTNER"}>Parceiro</MenuItem>
                </Select>

                <Controller
                  name={"name"}
                  control={control}
                  render={({ field: { value } }) => (
                    <TextField
                      error={errors.name ? true : false}
                      helperText={errors.name ? "Preencha este campo" : ""}
                      value={value}
                      label={"Nome Completo"}
                      {...register("name", { required: true })}
                      autoComplete="name"
                    />
                  )}
                />
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
                      autoComplete="email"
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
                      autoComplete="new-password"
                    />
                  )}
                />
                <Controller
                  name={"confirm_password"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      error={errors.confirm_password ? true : false}
                      helperText={
                        errors.confirm_password
                          ? errors.confirm_password.message
                          : ""
                      }
                      {...register("confirm_password", {
                        required: true,
                        validate: (val: string) => {
                          if (watch("password") !== val) {
                            return "Senhas diferentes";
                          }
                        },
                      })}
                      value={value}
                      label={"Confirmar Senha"}
                      type="password"
                    />
                  )}
                />

                <Button variant="contained" component="label" color="primary">
                  {" "}
                  Escolha uma imagem
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    hidden
                  />
                </Button>
                <Button type="submit" color="info" variant="contained">
                  Criar
                </Button>
              </FormControl>
            </form>
          </Box>
          <Box alignSelf="center" mt={2}>
            Já possui uma conta?{" "}
            <Link
              component="button"
              variant="body2"
              underline="none"
              onClick={() => navigate("/login")}
            >
              Fazer login
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
