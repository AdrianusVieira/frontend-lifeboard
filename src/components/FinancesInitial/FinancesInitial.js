import React, { useState } from "react";
import CarteiraCreation from "../CarteiraCreation/CarteiraCreation";
import FundoCreation from "../FundoCreation";
import Button from "../../Styles/Button";
import {
  AuxiliarText,
  AuxiliarTitle,
  Body,
  CreationArea,
  CreationSection,
  InitialTitle,
  TitleSection,
} from "./Styles";
import * as managerService from "../../services/managerService";

function FinancesInitial(props) {
  async function calculatePatrimony() {
    var totalFundosPatrimony = 0;
    var totalCarteirasPatrimony = 0;

    await managerService
      .getCarteirasByUsuario(props.usuario.id_usuario)
      .then((res) => {
        res.array.forEach((carteira) => {
          totalCarteirasPatrimony =
            totalCarteirasPatrimony + carteira.patrimonio;
        });
      });
    await managerService
      .getFundosByUsuario(props.usuario.id_usuario)
      .then((res) => {
        res.array.forEach((fundo) => {
          totalFundosPatrimony = totalFundosPatrimony + fundo.patrimonio;
        });
      });

    const totalPatrimony = totalCarteirasPatrimony + totalFundosPatrimony;
    console.log(
      "🚀 ~ file: FinancesInitial.js:37 ~ calculatePatrimony ~ totalPatrimony",
      totalPatrimony
    );
  }
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
          <AuxiliarText fontSize="18px">
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
          <AuxiliarText fontSize="18px">
            Crie quantos Fundos quiser!
          </AuxiliarText>
        </CreationSection>
      </CreationArea>
      <Button
        onClick={() => {
          calculatePatrimony();
        }}
        width="40%"
        height="60px"
      >
        Start
      </Button>
    </Body>
  );
}

export default FinancesInitial;
