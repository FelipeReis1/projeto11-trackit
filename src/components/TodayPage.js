import styled from "styled-components";
import FooterMenu from "./FooterMenu";
import NavBar from "./NavBar";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/Context";
import axios from "axios";
import TodayHabit from "./TodayHabit";

export default function TodayPage() {
  const { user, habits, setHabits, percentage } = useContext(UserContext);

  let updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekdays: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
  });

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise.then((res) => {
      setHabits(res.data);
    });
    promise.catch((err) => alert(err.response.data.message));
    // eslint-disable-next-line
  }, []);

  return (
    <StyledContainer>
      <NavBar />
      <StyledHeader>
        <h1>{dayjs().locale("pt-br").format("dddd, DD/MM")}</h1>
        {habits.length === 0 ? (
          <h2>Nenhum hábito concluído ainda</h2>
        ) : (
          <h3>{percentage.toFixed(0)}% dos hábitos concluídos</h3>
        )}
      </StyledHeader>
      {habits.map((h, index) => (
        <TodayHabit key={index} habits={h} setHabits={setHabits} />
      ))}
      <FooterMenu />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 70px;
  background-color: #e5e5e5;
  margin-bottom: 70px;
`;

const StyledHeader = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 28px;
  h1 {
    font-family: "Lexend Deca";
    font-weight: 400;
    line-height: 29px;
    font-size: 23px;
    color: #126ba5;
  }
  h2 {
    font-family: "Lexend Deca";
    font-weight: 400;
    line-height: 22px;
    font-size: 18px;
    color: #bababa;
  }
  h3 {
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 18px;
    color: #8fc549;
  }
`;
