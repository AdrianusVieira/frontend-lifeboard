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
  height: 60%;
  overflow: auto;
`;
export const CarteiraView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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