import cls from "./ForbiddenPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.ts";

export const ForbiddenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const fromPage = location.state?.from || "/";

  useEffect(() => {
    if (isAuth) {
      navigate(fromPage, { replace: true });
    }
  }, [isAuth]);

  return <h2 className={cls.title}>Page is Forbidden!</h2>;
};
