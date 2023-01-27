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
export const LevelSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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

export const LevelText = styled.text`
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
export const TarefasSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 1% 1% 1% 1%;
`;
export const TarefasView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 48%;
  height: 100%;
  background-color: #5700d5;
  border-radius: 16px;
  box-shadow: 0px 0px 4px #1e1e1e, 0px 0px 4px #1e1e1e;
  padding: 1% 1% 1% 1%;
`;
export const CalendarView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 80%;
  background-color: #5700d5;
  border-radius: 16px;
  box-shadow: 0px 0px 4px #1e1e1e, 0px 0px 4px #1e1e1e;
  padding: 1% 1% 1% 1%;
`;
export const TitleText = styled.text`
  color: #fffdf7;
  font-size: 20px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;
export const TarefasList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80%;
  padding-top: 5%;
  overflow: auto;
`;
export const Tarefa = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;
export const TarefaText = styled.text`
  color: #fffdf7;
  font-size: 12px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;