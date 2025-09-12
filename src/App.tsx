import { MainLayout } from "./components/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>forbidden!!!</div>} />
          <Route path="/addquestion" element={<div>add question</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
