import styled from "styled-components";
import FooterMenu from "./FooterMenu";
import NavBar from "./NavBar";
export default function HabitsPage() {
  return (
    <StyledContainer>
      <NavBar />
      <StyledTopContainer>
        <h1>Meus Hábitos</h1>
        <button>
          <p>+</p>
        </button>
      </StyledTopContainer>
      <StyledMidContainer>
        <h2>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </h2>
      </StyledMidContainer>
      <FooterMenu />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
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
    width: 40px;
    height: 35px;
    background-color: #52b6ff;
    border-radius: 5px;
    border-style: none;
  }
  p {
    font-size: 27px;
    line-height: 34px;
    color: #ffffff;
  }
`;
const StyledMidContainer = styled.div`
  width: 90%;
  margin-top: 30px;
  h2 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
  }
`;
