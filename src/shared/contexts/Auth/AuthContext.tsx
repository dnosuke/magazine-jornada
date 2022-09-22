import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "../../../types/product";
import { IUser } from "../../../types/user";

import { AuthService } from "../../api/auth/AuthService";

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
  signup: (user: IUser) => void;
  getAllProducts: () => Promise<Product[]>;
  registerProduct: (product: Product) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
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
      localStorage.setItem("APP_ACCESS_TOKEN", JSON.stringify("result.token"));
      setAccessToken("result.token");
    }
  }, []);
  const handleLogout = useCallback(() => {
    localStorage.removeItem("APP_ACCESS_TOKEN");
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  const handleSignUp = useCallback(async (user: IUser) => {
    const result = await AuthService.signUp(user);
    console.log(result);
  }, []);

  const handleGetAll = useCallback(async () => {
    const result = await AuthService.getAll();
    console.log(result);
    return result;
  }, []);

  const handleResgisterProduct = useCallback(async (product: Product) => {
    const result = await AuthService.resgisterProduct(product);
    console.log(result);
  }, []);
  const handleRemoveProduct = useCallback(async (id: number) => {
    const result = await AuthService.removeProduct(id);
    console.log(result);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignUp,
        getAllProducts: handleGetAll,
        registerProduct: handleResgisterProduct,
        removeProduct: handleRemoveProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
