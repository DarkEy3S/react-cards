import type { MouseEvent, ReactNode } from "react";
import cls from "./Button.module.css";

interface Props {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ children, isActive, isDisabled, onClick }: Props) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <button className={`${cls.button} ${isActive ? cls.active : ""}`} onClick={handleClick} disabled={isDisabled}>
      {children}
    </button>
  );
};
