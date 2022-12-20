import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/Context";
import FooterMenu from "./FooterMenu";
import Habits from "./Habits";
import NavBar from "./NavBar";
import trashcan from "../assets/img/trash_can.png";
import axios from "axios";
import loading from "../assets/img/loading.gif";

export default function HabitsPage() {
  const [trigger, setTrigger] = useState(false);
  const [habit, setHabit] = useState(undefined);
  const { user } = useContext(UserContext);
  const weekDays = [
    {
      name: "D",
      day: 0,
    },
    {
      name: "S",
      day: 1,
    },
    {
      name: "T",
      day: 2,
    },
    {
      name: "Q",
      day: 3,
    },
    {
      name: "Q",
      day: 4,
    },
    {
      name: "S",
      day: 5,
    },
    {
      name: "S",
      day: 6,
    },
  ];

  useEffect(() => {
    habitsLoader();
    // eslint-disable-next-line
  }, []);

  if (habit === undefined) {
    return (
      <StyledLoading>
        <img src={loading} alt={"Carregando"} />
      </StyledLoading>
    );
  }

  function handleTrigger() {
    if (!trigger) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  }

  function habitsLoader() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise.then((res) => setHabit(res.data));
    promise.catch((err) => alert(err.response.data.message));
  }

  function deleteHabit(habit) {
    if (window.confirm("Apagar hábito?")) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`,
        config
      );
      promise.then(() => {
        const promise = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
          config
        );
        promise.then((res) => {
          setHabit(res.data);
        });
      });
      promise.catch((err) => alert(err.response.data.message));
    }
  }

  return (
    <StyledContainer>
      <NavBar />
      <StyledTopContainer>
        <h1>Meus Hábitos</h1>
        <button>
          <p onClick={handleTrigger}>+</p>
        </button>
      </StyledTopContainer>
      {trigger && (
        <Habits handleTrigger={handleTrigger} habitsLoader={habitsLoader} />
      )}
      {habit.map((h) => (
        <StyledHabitContainer key={h.id}>
          <StyledHabit>
            <h1>{h.name}</h1>
            <img
              src={trashcan}
              alt={"Lixeira"}
              onClick={() => deleteHabit(h)}
            />
          </StyledHabit>
          <StyledDaysDiv>
            {weekDays.map((w, index) => (
              <StyledDays selectedDay={h.days.includes(index)}>
                <p>{w.name}</p>
              </StyledDays>
            ))}
          </StyledDaysDiv>
        </StyledHabitContainer>
      ))}
      {habit.length === 0 && (
        <StyledMidContainer>
          <h2>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </h2>
        </StyledMidContainer>
      )}
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
`;
const StyledTopContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  h1 {
    height: 29px;
    font-size: 23px;
    line-height: 29px;
    color: #126ba5;
  }
  button {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 35px;
    background-color: #52b6ff;
    border-radius: 5px;
    border-style: none;
    &:hover {
      cursor: pointer;
    }
    p {
      font-size: 27px;
      color: #ffffff;
      margin-bottom: 2px;
    }
  }
`;
const StyledMidContainer = styled.div`
  width: 90%;
  margin-top: 30px;
  h2 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
    margin-bottom: 110px;
  }
`;

const StyledHabitContainer = styled.div`
  width: 90%;
  min-height: 91px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
`;

const StyledHabit = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 13px;
  position: relative;
  h1 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
  }
  img {
    width: 13px;
    height: 15px;
    position: absolute;
    top: 0px;
    left: 295px;
  }
`;
const StyledDaysDiv = styled.div`
  display: flex;
  margin-top: 8px;
  margin-left: 14px;
  margin-bottom: 14px;
`;
const StyledDays = styled.button`
  width: 33px;
  height: 33px;
  background-color: ${(props) => (!props.selectedDay ? "#ffffff" : "#CFCFCF")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: ${(props) => (!props.selectedDay ? "#dbdbdb" : "#FFFFFF")};
  }
`;
const StyledLoading = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
`;
