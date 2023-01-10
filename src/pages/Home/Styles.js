import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Base = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 90%;
  background-color: #e0c3f7;
  border-radius: 8px;
  box-shadow: 0px 0px 4px #e0c3f7;
  padding: 2% 0% 0% 0%;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 40%;
  background-color: #5700d5;
  border-radius: 16px;
  box-shadow: 2px 2px 4px #1e1e1e, -1px -1px 4px #1e1e1e;
  padding: 1% 1% 1% 1%;
`;
export const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  height: 100%;
  font-size: 8em;
`;
export const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 30%;
  height: 100%;
`;

export const DataText = styled.text`
  color: #fffdf7;
  font-size: 18px;
  font-family: "VT323";
  text-shadow: 2px 2px 6px #1e1e1e;
`;

export const LevelText = styled.text`
  color: #fffdf7;
  font-size: 25px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;

export const LevelSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
export const BarView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 60%;
`;
export const ExpView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40%;
`;
export const ExpText = styled.text`
  color: #fffdf7;
  font-size: 18px;
  font-family: "VT323";
  margin-left: 2px;
`;

export const PatrimonySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 35%;
  height: 100%;
`;

export const PatrimonyText = styled.text`
  color: #fffdf7;
  font-size: 25px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;

export const PatrimonyCircle = styled.button`
  color: #fffdf7;
  font-size: 20px;
  font-family: "VT323";
  text-shadow: 0px 0px 10px #1e1e1e;
  margin-top: ${(props) => props.marginTop ?? "0px"};
  width: 150px;
  height: 150px;
  background-color: transparent;
  border-radius: 50%;
  border-color: #e0c3f7;
  border-width: 4px;
  padding: 10px;
  margin-top: 20px;
`;

export const AuxiliarSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const AuxiliarView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 32%;
`;

export const AuxiliarText = styled.button`
  color: #fffdf7;
  font-size: 8px;
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
