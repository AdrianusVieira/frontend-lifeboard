import React from "react";
import CarteiraCreation from "../CarteiraCreation/CarteiraCreation";
import {
    AuxiliarText,
  AuxiliarTitle,
  Body,
  CreationArea,
  CreationSection,
  InitialTitle,
  TitleSection,
} from "./Styles";

function FinancesInitial(props) {
  return (
    <Body>
      <TitleSection>
        <InitialTitle>Lets Begin</InitialTitle>
        <AuxiliarTitle>
          Aqui vamos criar suas primeiras carteiras e fundos!
        </AuxiliarTitle>
      </TitleSection>
      <CreationArea>
        <CreationSection>
          <AuxiliarText fontSize="28px">Adicione Carteiras</AuxiliarText>
          <CarteiraCreation usuario={props.usuario}/>
        </CreationSection>
        <CreationSection>
          <AuxiliarText fontSize="28px">Adicione Fundos</AuxiliarText>
          <AuxiliarText >Começamos criando um fundo de Investimento Padrão, adicione seu valor:</AuxiliarText>
        </CreationSection>
      </CreationArea>
    </Body>
  );
}

export default FinancesInitial;
