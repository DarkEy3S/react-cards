import {} from "react";
import logoReact from "/public/vite.svg";
import cls from "./Header.module.css";
import { Button } from "../Button";

export const Header: React.FC = () => {
  return (
    <header className={cls.header}>
      <p>
        <img src={logoReact} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={cls.headerButtons}>
        <Button>Add</Button>
        <Button>Login</Button>
      </div>
    </header>
  );
};
