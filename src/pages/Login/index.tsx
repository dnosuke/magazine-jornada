import { Box, Button, Link, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../shared/contexts";
import userRegister from "../../shared/store/userRegister";

interface ILoginProps {
  children: React.ReactNode;
}

const Login: React.FC<ILoginProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = userRegister();

  const handleSubmit = async () => {
    if (email && password) {
      await login(email, password);
      userLogin(email);
    }
  };

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
        <Box width="50%" display={"flex"} justifyContent={"center"} alignItems={"center"} style={{ backgroundColor: "#285ec4" }}>
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
            gap={1}
          >
            <h1>Bem-vindo</h1>
            <span>Lorem ipsum dolor sit amet, consectetur adipisci elit</span>
            <TextField
              id="outlined-basic"
              error={false}
              helperText="Incorrect entry."
              label="E-mail"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Senha"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Esqueci a senha
            </Link>
            <Button color="info" variant="contained" onClick={handleSubmit}>
              Login
            </Button>
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
