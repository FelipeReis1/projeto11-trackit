import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function FooterMenu() {
  return (
    <StyledContainer>
      <Link to={"/habitos"} style={{ textDecoration: "none" }}>
        <p>Hábitos</p>
      </Link>
      <Link to={"/hoje"}>
        <StyledProgressBar>
          <CircularProgressbar
            text={"Hoje"}
            value={66}
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

      <Link to={"/historico"} style={{ textDecoration: "none" }}>
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
