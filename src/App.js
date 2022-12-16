import LoginPage from "../src/components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodayPage from "./components/TodayPage";
import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/hoje" element={<TodayPage />} />
        <Route path="/cadastro" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
