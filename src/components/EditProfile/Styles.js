import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #5700d5;
`;
export const ChangeTitle = styled.text`
  color: #fffdf7;
  font-size: 30px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
`;
export const UploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

export const ChangeSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 12px;
`;
export const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 40%;
`;
export const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 40%;
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
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const AuxiliarView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40%;
`;

export const AuxiliarText = styled.button`
  color: #fffdf7;
  font-size: 12px;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 4px #1e1e1e;
  text-decoration: underline;
  background-color: transparent;
  border: 0;
  &:hover,
  &:focus {
    color: #00b4d8;
  }
`;