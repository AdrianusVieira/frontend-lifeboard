import React from "react";
import { useHistory } from "react-router-dom";
import { AuxiliarText, Base, Body, Box, InitialTitle } from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";

function Login() {
  const history = useHistory();
  return (
    <Body>
      <Base>
        <Box>
          <InitialTitle>Lets Begin!</InitialTitle>
          <Input
            width="70%"
            marginTop="30px"
            placeholder="Insira seu email jogador:"
          />
          <StartButton marginTop="30px">Start</StartButton>
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
