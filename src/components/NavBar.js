import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/Context";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <StyledNavBarContainer>
      <Link style={{ textDecoration: "none" }} to="/">
        <h1>TrackIt</h1>
      </Link>
      <img src={user.image} alt="UserImage" />
    </StyledNavBarContainer>
  );
}

const StyledNavBarContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  background-color: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  h1 {
    width: 97px;
    height: 49px;
    font-family: "Playball";
    font-style: normal;
    font-weight: 400;
    font-size: 38.982px;
    line-height: 49px;
    color: #ffffff;
    margin-left: 18px;
  }
  img {
    width: 51px;
    height: 51px;
    border-radius: 99px;
    margin-right: 18px;
  }
`;
