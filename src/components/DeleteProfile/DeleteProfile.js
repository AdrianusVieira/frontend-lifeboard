import React from "react";
import {
  AuxiliarText,
  Box,
  ButtonSection,
  DeleteTitle,
  TitleSection,
} from "./Styles";
import StartButton from "../../Styles/StartButton";
import { getEmail } from "../../services/auth";
import { useHistory } from "react-router-dom";
import * as managerService from "../../services/managerService";
import { sleep } from "../../utils/sleep";

function DeleteProfile(props) {
  const history = useHistory();
  async function deleteUsuario() {
    props.startLoading();
    const email = getEmail();
    await managerService.deleteUsuarioByEmail(email);
    await sleep(4000).then(() => {
      history.push("/login");
    });
  }

  return (
    <Box>
      <TitleSection>
        <DeleteTitle>Give UP ?</DeleteTitle>
        <AuxiliarText>Tem certeza que deseja excluir sua Conta ?</AuxiliarText>
        <ButtonSection>
          <StartButton onClick={() => props.fecharDelete()} marginTop="30px">
            NAO
          </StartButton>
          <StartButton onClick={() => deleteUsuario()} marginTop="30px">
            SIM
          </StartButton>
        </ButtonSection>
      </TitleSection>
    </Box>
  );
}

export default DeleteProfile;
