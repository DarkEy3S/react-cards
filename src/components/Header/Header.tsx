import {} from "react";
import logoReact from "/public/react.svg";
import cls from "./Header.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";
import { AUTH_STORAGE } from "../../constants";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  const loginHandler = () => {
    localStorage.setItem(AUTH_STORAGE, String(!isAuth));
    setIsAuth(!isAuth);
  };

  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={logoReact} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={cls.headerButtons}>
        {isAuth && <Button onClick={() => navigate("/addquestion")}>Add</Button>}
        <Button onClick={loginHandler} isActive={!isAuth}>
          {isAuth ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};
