import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Login>
          <AppRoutes />
        </Login>
      </BrowserRouter>
    </AuthProvider>
  );
};
