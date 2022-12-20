import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import UserContext from "../contexts/Context";
import { useContext } from "react";

export default function FooterMenu() {
  const { percentage } = useContext(UserContext);
  return (
    <StyledContainer data-test="menu">
      <Link
        data-test="habit-link"
        to={"/habitos"}
        style={{ textDecoration: "none" }}
      >
        <p>Hábitos</p>
      </Link>
      <Link data-test="today-link" to={"/hoje"}>
        <StyledProgressBar>
          <CircularProgressbar
            text={"Hoje"}
            value={percentage}
            background={true}
            backgroundPadding={5}
            styles={buildStyles({
              pathColor: "#ffffff",
              backgroundColor: "#52B6FF",
              trailColor: "#52B6FF",
              textColor: "#ffffff",
            })}
          />
        </StyledProgressBar>
      </Link>

      <Link
        data-test="history-link"
        to={"/historico"}
        style={{ textDecoration: "none" }}
      >
        <p>Histórico</p>
      </Link>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0px;
  background-color: #ffffff;
  z-index: 2;
  p {
    height: 22px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #52b6ff;
  }
`;
const StyledProgressBar = styled.div`
  width: 91px;
  height: 91px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 55px;
`;
