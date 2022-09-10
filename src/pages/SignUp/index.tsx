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
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../shared/contexts";
import { IUser } from "../../types/user";


function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuthContext();
  const [userType, setUserType] = useState<string>();
  const [user, setUser] = useState<IUser>();

  const handleChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value as string);
    setUser({...user, userType: event.target.value } as IUser)
  };

  const handleSignUp = () => {
    signup(user as IUser);
  }
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files === null){
      return
    }else{
      setUser({...user, profilePicture: e.target.files[0].name } as IUser)
    }
    
  }
  
  console.log(user);
  
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
                value={userType || ''}
                label="Tipo"
                onChange={handleChange}
              >
                <MenuItem value={"CUSTOMER"}>Cliente</MenuItem>
                <MenuItem value={"PARTNER"}>Parceiro</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="name-outlined-basic"
              error={false}
              helperText=""
              label="Nome Completo"
              variant="outlined"
              value={user?.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value } as IUser)}
            />
            <TextField
              id="outlined-basic"
              error={false}
              helperText=""
              label="E-mail"
              variant="outlined"
              value={user?.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value } as IUser)}
            />
            <TextField
              id="outlined-password-input"
              label="Senha"
              type="password"
              autoComplete="current-password"
              value={user?.password || ''}
              onChange={(e) => setUser({ ...user, password: e.target.value } as IUser)}
            />
            <TextField
              id="repeat-password-input"
              label="Confirmar Senha"
              type="password"
              autoComplete="current-password"
            />
            <Button variant="contained" component="label" color="primary">
              {" "}
              Escolha uma imagem
              <input type="file" accept="image/*" onChange={handleUpload} hidden/>
            </Button>
            <Button
              color="info"
              variant="contained"
              onClick={handleSignUp}
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
              onClick={() => navigate('/login')}
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
