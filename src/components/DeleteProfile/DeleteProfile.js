import React from "react";
import {
  AuxiliarText,
  Box,
  ButtonSection,
  DeleteTitle,
  TitleSection,
} from "./Styles";
import StartButton from "../../Styles/StartButton";

function DeleteProfile(props) {
  return (
    <Box>
      <TitleSection>
        <DeleteTitle>Give UP ?</DeleteTitle>
        <AuxiliarText>Tem certeza que deseja excluir sua Conta ?</AuxiliarText>
        <ButtonSection>
          <StartButton onClick={() => props.fecharDelete()} marginTop="30px">
            NAO
          </StartButton>
          <StartButton onClick={() => console.log("oi")} marginTop="30px">
            SIM
          </StartButton>
        </ButtonSection>
      </TitleSection>
    </Box>
  );
}

export default DeleteProfile;
