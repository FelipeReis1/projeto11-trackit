import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.png";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    setIsLoading(true);
    const request = {
      email: email,
      name: name,
      image: image,
      password: password,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      request
    );
    promise.then(() => {
      setIsLoading(false);
      navigate("/");
    });
    promise.catch((err) => {
      setIsLoading(false);
      setEmail("");
      setImage("");
      setName("");
      setPassword("");
      alert(err.response.data.message);
    });
  }

  return (
    <StyledContainer>
      <StyledLogo src={logo} alt={"TrackIt"} />
      <StyledForm onSubmit={login}>
        <input
          required
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="foto"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {!isLoading ? (
          <StyledBottomButton type="submit" disabled={isLoading}>
            Cadastrar
          </StyledBottomButton>
        ) : (
          <StyledBottomButton disabled={isLoading}>
            <ThreeDots color="#ffffff" />
          </StyledBottomButton>
        )}
        <Link to={"/"}>
          <p>Já tem uma conta? Faça login!</p>
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
