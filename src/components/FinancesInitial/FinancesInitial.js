import React from "react";
import CarteiraCreation from "../CarteiraCreation/CarteiraCreation";
import FundoCreation from "../FundoCreation";
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
        <AuxiliarTitle>
          Seu Patrimonio Total será a soma dos patrimonios dos fundos e
          carteiras que você criar!
        </AuxiliarTitle>
      </TitleSection>
      <CreationArea>
        <CreationSection>
          <AuxiliarText fontSize="28px">Adicione Carteiras</AuxiliarText>
          <CarteiraCreation usuario={props.usuario} />
          <AuxiliarText fontSize="28px">
            Crie quantas carteiras quiser!
          </AuxiliarText>
        </CreationSection>
        <CreationSection>
          <AuxiliarText fontSize="28px">Adicione Fundos</AuxiliarText>
          <AuxiliarText>
            Começamos criando um fundo de Investimento Padrão, adicione seu
            valor posteriormente na área de fundos.
          </AuxiliarText>
          <FundoCreation usuario={props.usuario} />
          <AuxiliarText fontSize="28px">
            Crie quantos Fundos quiser!
          </AuxiliarText>
        </CreationSection>
      </CreationArea>
    </Body>
  );
}

export default FinancesInitial;
