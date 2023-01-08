import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  AuxiliarText,
  Base,
  Body,
  Box,
  InitialTitle,
  ReturnText,
} from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";

import * as managerService from "../../services/managerService";

function Cadastro() {
  const history = useHistory();
  const [newUsuario, setNewUsuario] = useState({});

  function fillingUsuarioData(e) {
    const { value, name } = e.target;
    setNewUsuario({ ...newUsuario, [name]: value });
  }
  async function createNewUsuario() {
    const result = await managerService.createUsuario(newUsuario);
    if (result) {
      history.push("/home");
    } else {
      window.location.reload();
    }
  }

  return (
    <Body>
      <Base>
        <Box>
          <InitialTitle>Welcome to Board!</InitialTitle>
          <AuxiliarText>Favor Preencher:</AuxiliarText>
          <Input
            name="nome"
            width="60%"
            marginTop="30px"
            placeholder="Nome Completo:"
            onChange={fillingUsuarioData}
          />
          <Input
            name="email"
            width="60%"
            marginTop="30px"
            placeholder="Endereço de Email:"
            onChange={fillingUsuarioData}
          />
          <Input
            name="data_nascimento"
            width="60%"
            marginTop="30px"
            placeholder="Data de Nascimento:"
            onChange={fillingUsuarioData}
          />
          <StartButton onClick={() => createNewUsuario()} marginTop="30px">
            Start
          </StartButton>
          <ReturnText
            onClick={() => {
              history.push("/login");
            }}
          >
            Ja é um Jogador?
          </ReturnText>
        </Box>
      </Base>
    </Body>
  );
}

export default Cadastro;
