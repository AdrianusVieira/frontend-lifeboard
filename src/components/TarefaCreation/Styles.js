import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 80%;
`;
export const CreationTitle = styled.text`
  color: #fffdf7;
  font-size: 18px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;
export const AuxiliarText = styled.button`
  color: #fffdf7;
  font-size: 14px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
  text-decoration: underline;
  background-color: transparent;
  margin-left: 4px;
  border: 0;
  &:hover,
  &:focus {
    color: #00b4d8;
  }
`;
export const AuxiliarSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 2%;
  align-items: center;
  width: 100%;
`;
