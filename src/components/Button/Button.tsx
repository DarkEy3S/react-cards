import {} from "react";
import cls from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ children, isActive, isDisabled, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button className={`${cls.button} ${isActive ? cls.active : ""}`} onClick={handleClick} disabled={isDisabled}>
      {children}
    </button>
  );
};
