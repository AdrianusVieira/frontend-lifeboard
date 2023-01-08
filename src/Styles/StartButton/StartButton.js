import styled from "styled-components";

export const StartButton = styled.button`
  color: #fffdf7;
  font-size: 25px;
  font-family: "Press Start 2P";
  text-shadow: 0px 0px 10px #1e1e1e;
  margin-top: ${(props) => props.marginTop ?? "0px"};
  width: 40%;
  background-color: transparent;
  border-radius: 32px;
  border-color: #e0c3f7;
  border-width: 4px;
  padding: 10px;
  &:hover,
  &:focus {
    border-color: #00b4d8;
    color: #e0c3f7;
  }
`;

export default StartButton;
