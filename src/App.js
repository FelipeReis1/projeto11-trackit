import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "../src/components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import HabitsPage from "./components/HabitsPage";
import TodayPage from "./components/TodayPage";
import History from "./components/History";
import UserContext from "./contexts/Context";

function App() {
  const [user, setUser] = useState({});
  const [habits, setHabits] = useState([]);
  let [percentage] = useState(0);
  let sum = 0;
  for (let i = 0; i < habits.length; i++) {
    if (habits[i].done) {
      sum++;
    }
  }
  percentage = (sum * 100) / habits.length;
  const contextValue = { user, setUser, habits, setHabits, percentage };
  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegistrationPage />} />
          <Route path="/habitos" element={<HabitsPage />} />
          <Route path="/hoje" element={<TodayPage />} />
          <Route path="/historico" element={<History />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
