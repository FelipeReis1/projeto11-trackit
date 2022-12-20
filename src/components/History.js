import styled from "styled-components";
import FooterMenu from "./FooterMenu";
import NavBar from "./NavBar";

export default function History() {
  return (
    <StyledContainer>
      <NavBar />
      <StyledTopContainer>
        <h1>Histórico</h1>
      </StyledTopContainer>
      <StyledMidContainer>
        <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
      </StyledMidContainer>
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
