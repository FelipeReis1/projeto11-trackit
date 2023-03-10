import axios from "axios";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.png";
import UserContext from "../contexts/Context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    setIsLoading(true);
    const request = {
      email: email,
      password: password,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      request
    );
    promise.then((res) => {
      setIsLoading(false);
      setUser(res.data);
      navigate("/hoje");
    });
    promise.catch((err) => {
      setIsLoading(false);
      alert(err.response.data.message);
    });
  }
  return (
    <StyledContainer>
      <StyledLogo src={logo} alt={"TrackIt"} />
      <StyledForm onSubmit={login}>
        {!isLoading ? (
          <input
            disabled={isLoading}
            data-test="email-input"
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <input
            disabled={isLoading}
            data-test="email-input"
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {!isLoading ? (
          <input
            disabled={isLoading}
            data-test="password-input"
            required
            type="password"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <input
            disabled={isLoading}
            data-test="password-input"
            required
            type="password"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        {!isLoading ? (
          <StyledBottomButton
            data-test="login-btn"
            type="submit"
            disabled={isLoading}
          >
            Entrar
          </StyledBottomButton>
        ) : (
          <StyledBottomButton data-test="login-btn" disabled={isLoading}>
            <ThreeDots color="#ffffff" />
          </StyledBottomButton>
        )}
        <Link data-test="signup-link" to={"/cadastro"}>
          <p>N??o tem uma conta? Cadastre-se</p>
        </Link>
      </StyledForm>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const StyledLogo = styled.img`
  width: 180px;
  height: 178px;
  margin-top: 68px;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    background-color: #ffffff;
    margin-bottom: 6px;
    opacity: ${(props) => (!props.disabled ? "1" : "0.7")};
    &::placeholder {
      font-family: "Lexend Deca";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;
      color: #dbdbdb;
      padding-left: 10px;
    }
  }
  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52b6ff;
    margin-top: 25px;
  }
`;

const StyledBottomButton = styled.button`
  width: 309px;
  height: 45px;
  background-color: #52b6ff;
  border-radius: 5px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
  line-height: 26px;
  text-align: center;
  border-style: none;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (!props.disabled ? "1" : "0.7")};
  &:hover {
    cursor: pointer;
  }
`;
