import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 4% 2% 4% 2%;
`;
export const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70%;
  background-color: #e0c3f7;
  border-radius: 8px;
  box-shadow: 0px 0px 4px #e0c3f7;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  background-color: #5700d5;
  border-radius: 16px;
  box-shadow: 2px 2px 4px #1e1e1e, -1px -1px 4px #1e1e1e;
`;
export const InitialTitle = styled.text`
  color: #fffdf7;
  font-size: 40px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;
export const AuxiliarText = styled.button`
  color: #fffdf7;
  font-size: 11px;
  font-family: "Press Start 2P";
  margin-top: 18px;
  text-shadow: 2px 2px 4px #1e1e1e;
  text-decoration: underline;
  background-color: transparent;
  border: 0;
  &:hover,
  &:focus {
    color: #00b4d8;
  }
`;
