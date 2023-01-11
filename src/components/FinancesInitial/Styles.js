import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 1%;
`;
export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
export const InitialTitle = styled.text`
  color: #5700d5;
  font-size: 50px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;
export const AuxiliarTitle = styled.text`
  color: #5700d5;
  font-size: 25px;
  font-family: "VT323";
  text-shadow: 1px 1px 1.5px #1e1e1e;
`;
export const CreationArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const CreationSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 45%;
  height: 95%;
  background-color: #5700d5;
  border-radius: 16px;
  box-shadow: 2px 2px 4px #1e1e1e, -1px -1px 4px #1e1e1e;
`;
export const AuxiliarText = styled.text`
  color: #fffdf7;
  font-size: ${(props) => props.fontSize ?? "18px"};
  font-family: "VT323";
  text-shadow: 1px 1px 1.5px #1e1e1e;
`;