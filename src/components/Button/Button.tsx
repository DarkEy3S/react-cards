import cls from "./Button.module.css";
import type { ReactNode } from "react";
import { useState } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  const [isPrimary, setIsPrimary] = useState(false);

  const handleClick = (): void => {
    setIsPrimary(!isPrimary);
    if (onClick) onClick();
  };

  return (
    <button className={`${isPrimary ? cls.primary : cls.btn} `} onClick={handleClick}>
      кнопка ({children})
    </button>
  );
};
