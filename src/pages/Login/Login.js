import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuxiliarText, Base, Body, Box, InitialTitle } from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";

import * as managerService from "../../services/managerService";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  async function getUsuarioByEmail() {
    const result = await managerService.getUsuarioByEmail(email);
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
          <InitialTitle>Lets Begin!</InitialTitle>
          <Input
            width="70%"
            marginTop="30px"
            placeholder="Insira seu email jogador:"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <StartButton onClick={() => getUsuarioByEmail()} marginTop="30px">
            Start
          </StartButton>
          <AuxiliarText
            onClick={() => {
              history.push("/cadastro");
            }}
          >
            Ainda não Joga ?
          </AuxiliarText>
        </Box>
      </Base>
    </Body>
  );
}

export default Login;
