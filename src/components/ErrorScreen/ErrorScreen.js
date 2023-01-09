import React from "react";
import { AuxiliarText, Body, Box, ErrorTitle } from "./Styles";

function ErrorScreen() {
  return (
    <Body>
      <Box>
        <ErrorTitle>GAME OVER</ErrorTitle>
        <AuxiliarText>Favor Retornar ou Chamar um Jogador mais Experiente!</AuxiliarText>
      </Box>
    </Body>
  );
}

export default ErrorScreen;
