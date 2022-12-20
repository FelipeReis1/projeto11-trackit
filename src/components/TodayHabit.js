import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/Context";
import checkmark from "../assets/img/checkmark.png";

export default function TodayHabit({ habits, setHabits }) {
  const { user } = useContext(UserContext);
  const [currentSequenceColor, setCurrentSequenceColor] = useState(false);
  const [recordColor, setRecordColor] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  function check() {
    if (habits.done === false) {
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habits.id}/check`,
        {},
        config
      );
      promise.then(() => {
        setCurrentSequenceColor(true);
        if (habits.currentSequence === habits.highestSequence) {
          setRecordColor(true);
        }
        const promise = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
          config
        );
        promise.then((res) => {
          setHabits(res.data);
        });
      });
    } else {
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habits.id}/uncheck`,
        {},
        config
      );
      setCurrentSequenceColor(false);
      setRecordColor(false);
      promise.then(() => {
        const promise = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
          config
        );
        promise.then((res) => {
          setHabits(res.data);
        });
      });
    }
  }
  return (
    <StyledHabitContainer>
      <h1>{habits.name}</h1>
      <h2 currentSequenceColor={currentSequenceColor}>
        Sequência atual: {habits.currentSequence} dias
      </h2>
      <h3 recordColor={recordColor}>
        Seu recorde: {habits.highestSequence} dias
      </h3>
      <StyledButton onClick={check} habits={habits}>
        <img src={checkmark} alt={"Checkmark"} />
      </StyledButton>
    </StyledHabitContainer>
  );
}

const StyledHabitContainer = styled.div`
  width: 90%;
  min-height: 91px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  h1 {
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 20px;
    color: #666666;
    margin-bottom: 7px;
  }
  h2 {
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: ${(props) => (props.currentSequenceColor ? "#8FC549" : "#666666")};
  }
  h3 {
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: ${(props) => (props.recordColor ? "#8FC549" : "#666666")};
  }
`;
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 69px;
  height: 69px;
  background-color: ${(props) => (props.habits.done ? "#8FC549" : "#EBEBEB")};
  border-radius: 5px;
  border-style: none;
  position: absolute;
  top: 13px;
  right: 13px;
  img {
    width: 35px;
    height: 28px;
  }
`;
