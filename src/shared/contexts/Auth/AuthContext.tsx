import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../../../types/user";

import { AuthService } from "../../api/auth/AuthService";

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
  all: () => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem("APP_ACCESS_TOKEN");

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(
        "APP_ACCESS_TOKEN",
        JSON.stringify(result.data.Token)
      );
      setAccessToken(result.data.Token);
    }
  }, []);
  const handleLogout = useCallback(() => {
    localStorage.removeItem("APP_ACCESS_TOKEN");
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  const handleAll = useCallback(async () => {
    const result = await AuthService.getAll();
    console.log(result);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        all: handleAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);