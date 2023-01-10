import styled from "styled-components";

export const StartButton = styled.button`
  color: #fffdf7;
  font-size: 18px;
  font-family: "Press Start 2P";
  text-shadow: 0px 0px 10px #1e1e1e;
  box-shadow: 0px 0px 4px #e0c3f7;
  margin-top: ${(props) => props.marginTop ?? "0px"};
  width: ${(props) => props.width ?? "0px"};
  height: ${(props) => props.height ?? "0px"};
  background-color: #5700d5;
  border-radius: 16px;
  padding: 10px;
  &:hover,
  &:focus {
    background-color: #745296;
  }
`;

export default StartButton;
