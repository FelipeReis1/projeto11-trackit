import axios from "axios";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import UserContext from "../contexts/Context";

export default function Habits({ handleTrigger, habitsLoader }) {
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
  const [habitName, setHabitName] = useState("");
  const [selectedDay, setSelectedDay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  function daySelector(index) {
    if (!selectedDay.includes(index)) {
      const aux = [...selectedDay, index];
      setSelectedDay(aux);
    } else {
      const daysFilter = selectedDay.filter((s) => !(s === index));
      setSelectedDay([...daysFilter]);
    }
  }
  function sendHabit(e) {
    e.preventDefault();
    setIsLoading(true);
    const request = { name: habitName, days: selectedDay };
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      request,
      config
    );
    promise.then(() => {
      setIsLoading(false);
      handleTrigger();
      habitsLoader();
    });
    promise.catch((err) => alert(err.response.data.message));
  }
  return (
    <StyledFormContainer>
      <StyledForm data-test="habit-create-container" onSubmit={sendHabit}>
        <input
          data-test="habit-name-input"
          required
          type="text"
          placeholder="nome do hábito"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />

        <StyledDaysDiv>
          {weekDays.map((w, index) => (
            <StyledDays
              data-test="habit-day"
              key={index}
              selectedDay={selectedDay.includes(index)}
              onClick={() => daySelector(index)}
            >
              <p>{w.name}</p>
            </StyledDays>
          ))}
        </StyledDaysDiv>
        <StyledOptions>
          <StyledCancelButton
            data-test="habit-create-cancel-btn"
            onClick={handleTrigger}
          >
            Cancelar
          </StyledCancelButton>
          {!isLoading ? (
            <StyledSaveButton
              data-test="habit-create-save-btn"
              type="submit"
              disabled={isLoading}
            >
              Salvar
            </StyledSaveButton>
          ) : (
            <StyledSaveButton disabled={isLoading}>
              <ThreeDots width={60} color="#ffffff" />
            </StyledSaveButton>
          )}
        </StyledOptions>
      </StyledForm>
    </StyledFormContainer>
  );
}
const StyledFormContainer = styled.div`
  width: 90%;
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
`;

const StyledForm = styled.form`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 18px;
  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    background-color: #ffffff;
    margin-bottom: 6px;
    position: relative;
    font-family: "Lexend Deca";
    font-style: normal;
    font-size: 20px;
    color: #666666;
    padding-left: 10px;
    &::placeholder {
      font-family: "Lexend Deca";
      font-weight: 400;
      font-size: 20px;
      color: #dbdbdb;
      padding-left: 5px;
      position: absolute;
      padding-top: 8px;
    }
  }
`;
const StyledDaysDiv = styled.div`
  display: flex;
  margin-right: 58px;
`;
const StyledDays = styled.div`
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

const StyledOptions = styled.div`
  display: flex;
  margin-top: 29px;
  justify-content: center;
  align-items: center;
  margin-left: 135px;
  margin-bottom: 15px;
`;
const StyledCancelButton = styled.button`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #52b6ff;
  margin-right: 10px;
  background-color: #ffffff;
  border-style: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledSaveButton = styled.button`
  width: 84px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #52b6ff;
  border-radius: 5px;
  border-style: none;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  opacity: ${(props) => (!props.disabled ? "1" : "0.7")};
  &:hover {
    cursor: pointer;
  }
`;
