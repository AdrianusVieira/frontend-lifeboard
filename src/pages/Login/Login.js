import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuxiliarText, Base, Body, Box, InitialTitle } from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";

import * as managerService from "../../services/managerService";
import { login } from "../../services/auth";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  async function loginUsuario() {
    const result = await managerService.getUsuarioByEmail(email);
    if (result) {
      login(email);
      history.push("/home", { usuario: result });
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
          <StartButton onClick={() => loginUsuario()} marginTop="30px">
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
