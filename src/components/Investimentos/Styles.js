import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 1%;
  overflow: auto;
  padding-bottom: 1%;
`;
export const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 1%;
  width: 100%;
  margin-bottom: 1%;
`;
export const CreationSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 95%;
  background-color: #5700d5;
  border-radius: 16px;
  box-shadow: 2px 2px 4px #1e1e1e, -1px -1px 4px #1e1e1e;
  padding: 1%;
`;
export const ReturnSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
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
  margin-bottom: 1%;
  &:hover,
  &:focus {
    color: #00b4d8;
  }
`;
export const InvestimentoView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-color: #5700d5;
  border-width: 4px;
  border-radius: 16px;
  width: 80%;
  padding-top: 1%;
  padding-bottom: 1%;
  background-color: transparent;
  border-style: solid;
  margin-bottom: 8%;
`;
export const InitialTitle = styled.text`
  color: #5700d5;
  font-size: 20px;
  font-family: "Press Start 2P";
  text-shadow: 0px 0px 3px #1e1e1e;
`;
export const InputSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  padding-top: 4%;
  padding-bottom: 4%;
`;
export const CreationTitle = styled.text`
  color: #5700d5;
  font-size: 25px;
  font-family: "Press Start 2P";
  text-shadow: 0px 0px 4px #1e1e1e;
  margin-top: 4%;
  
`;
