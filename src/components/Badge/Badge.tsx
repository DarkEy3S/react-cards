import cls from "./Badge.module.css";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  option?: "primary" | "success" | "warning" | "alert" | null; // необязательный
};

export const Badge = ({ children, option }: BadgeProps) => {
  switch (option) {
    case "success":
      return <div className={`${cls.badge} ${cls.success}`}>{children}</div>;
    case "primary":
      return <div className={`${cls.badge} ${cls.primary}`}>{children}</div>;
    case "warning":
      return <div className={`${cls.badge} ${cls.warning}`}>{children}</div>;
    case "alert":
      return <div className={`${cls.badge} ${cls.alert}`}>{children}</div>;
    default:
      return <div className={cls.badge}>{children}</div>;
  }
};
