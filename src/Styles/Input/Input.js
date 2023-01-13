import styled from "styled-components";
import { Input } from "antd";

const InputAntd = styled(Input)`
  background-color: transparent;
  text-align: ${(props) => props.textAlign ?? "left"};
  color: ${(props) => props.color ?? "#fffdf7"};
  font-size: 18px;
  font-family: "VT323";
  height: 30px;
  padding-left: 2%;
  border-radius: 8px;
  border-color: ${(props) => props.borderColor ?? "#e0c3f7"};
  border-width: 3px;
  margin-top: ${(props) => props.marginTop ?? "0px"};
  width: ${(props) => props.width};
  &:hover,
  &:focus {
    border-color: #00b4d8;
  }
  &::placeholder {
    color: #5700d5;
  }
`;


export default InputAntd;
