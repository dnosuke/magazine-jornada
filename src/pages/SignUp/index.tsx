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
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value as string);
  };

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
        <Box width="50%" style={{ backgroundColor: "#285ec4" }}>
          imagem
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
          <Box alignSelf={"center"}>imagem</Box>
          <Box
            width="70%"
            display="flex"
            flexDirection={"column"}
            alignSelf={"center"}
            textAlign="center"
            gap={1}
          >
            <h1>Bem-vindo</h1>
            <span>Lorem ipsum dolor sit amet, consectetur adipisci elit</span>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={userType}
                label="Tipo"
                onChange={handleChange}
              >
                <MenuItem value={"cliente"}>Cliente</MenuItem>
                <MenuItem value={"parceiro"}>Parceiro</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              error
              helperText="Incorrect entry."
              label="Nome Completo"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              error
              helperText="Incorrect entry."
              label="E-mail"
              variant="outlined"
            />
            <TextField
              id="outlined-password-input"
              label="Senha"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="Confirmar Senha"
              type="password"
              autoComplete="current-password"
            />
            <Button variant="contained" component="label" color="primary">
              {" "}
              Escolha uma imagem
              <input type="file" hidden />
            </Button>
            <Button
              color="info"
              variant="contained"
              onClick={() => {
                console.info("Criado");
              }}
            >
              Criar
            </Button>
          </Box>
          <Box alignSelf="center">
            Já possui uma conta?{" "}
            <Link
              component="button"
              variant="body2"
              underline="none"
              onClick={() => navigate("/login", { state: "" })}
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
