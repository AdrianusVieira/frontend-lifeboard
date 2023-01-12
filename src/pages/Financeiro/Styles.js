import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 100%;
  background-color: #e0c3f7;
  box-shadow: 0px 0px 4px #e0c3f7;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 98%;
  height: 18%;
  background-color: #5700d5;
  box-shadow: 0px 0px 4px #1e1e1e, 0px 0px 4px #1e1e1e;
  padding: 1% 1% 1% 1%;
`;
export const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const PatrimonySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const ReturnSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const PatrimonyText = styled.text`
  color: #fffdf7;
  font-size: 16px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;
export const AuxiliarText = styled.button`
  color: #fffdf7;
  font-size: 16px;
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
export const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 1%;
  width: 100%;
`;