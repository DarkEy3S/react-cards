import { MainLayout } from "./components/MainLayout";
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage";
import { EditQuestionPage } from "./pages/EditQuestionPage";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./hooks/useAuth.ts";
import { ForbiddenPage } from "./pages/ForbiddenPage";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? <Outlet /> : <Navigate to={"/forbidden"} state={{ from: location.pathname }} replace={true} />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/question/:id" element={<QuestionPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/addquestion" element={<AddQuestionPageLazy />} />
              <Route path="/editquestion/:id" element={<EditQuestionPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
