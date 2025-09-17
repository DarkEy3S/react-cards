import { createContext, type ReactNode, type Dispatch, useState, type SetStateAction } from "react";
import { AUTH_STORAGE } from "../../constants";
export interface AuthContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE) || "false");

  const [isAuth, setIsAuth] = useState(isLogin);

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}> {children}</AuthContext.Provider>;
};
