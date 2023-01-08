import React from "react";
import { useHistory } from "react-router-dom";
import { AuxiliarText, Base, Body, Box, InitialTitle } from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";

function Cadastro() {
  return (
    <Body>
      <Base>
        <Box>
          <InitialTitle>Welcome to Board!</InitialTitle>
          <AuxiliarText>Favor Preencher:</AuxiliarText>
          <Input
            width="60%"
            marginTop="30px"
            placeholder="Nome Completo:"
          />
          <Input
            width="60%"
            marginTop="30px"
            placeholder="Endereço de Email:"
          />
          <Input
            width="60%"
            marginTop="30px"
            placeholder="Data de Nascimento:"
          />
          <StartButton marginTop="30px">Start</StartButton>
        </Box>
      </Base>
    </Body>
  );
}

export default Cadastro;
