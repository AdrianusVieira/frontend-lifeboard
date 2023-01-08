import React from "react";
import { AuxiliarText, Base, Body, Box, InitialTitle } from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";

function Login() {
  return (
    <Body>
      <Base>
        <Box>
          <InitialTitle>Lets Begin!</InitialTitle>
          <Input
            width="80%"
            marginTop="30px"
            placeholder="Insira seu email jogador:"
          />
          <StartButton marginTop="30px">Start</StartButton>
          <AuxiliarText>Ainda não Joga ?</AuxiliarText>
        </Box>
      </Base>
    </Body>
  );
}

export default Login;
