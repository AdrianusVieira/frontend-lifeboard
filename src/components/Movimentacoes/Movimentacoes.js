import React, { useState, useEffect } from "react";
import {
  Body,
  Box,
  InitialTitle,
  MovimentacaoView,
  AuxiliarText,
  ButtonSection,
} from "./Styles";
import * as managerService from "../../services/managerService";

function Movimentacoes(props) {
  const [movimentacoes, setMovimentacoes] = useState();
  async function getMovimentacoes() {
    if (props.carteira) {
      const result = await managerService.getMovimentacoesByCarteira(
        props.carteira
      );
      setMovimentacoes(result.reverse());
    } else if (props.fundo) {
      const result = await managerService.getMovimentacoesByFundo(props.fundo);
      setMovimentacoes(result.reverse());
    } else if (props.investimento) {
      const result = await managerService.getMovimentacoesByInvestimento(
        props.investimento
      );
      setMovimentacoes(result.reverse());
    }
  }
  useEffect(() => {
    getMovimentacoes();
  }, []);

  return (
    <Body>
      <ButtonSection>
        <AuxiliarText
          onClick={() => {
            props.close();
          }}
        >
          Fechar Movimentacoes
        </AuxiliarText>
      </ButtonSection>
      {movimentacoes?.map((movimentacao) => (
        <MovimentacaoView>
          <InitialTitle>{movimentacao.descricao}</InitialTitle>
          <>
            {movimentacao.tipo === "DEBIT" ? (
              <>
                <InitialTitle>R$ -{movimentacao.valor}</InitialTitle>
              </>
            ) : (
              <>
                <InitialTitle>R$ {movimentacao.valor}</InitialTitle>
              </>
            )}
          </>
          <InitialTitle>
            {movimentacao.data_hora.slice(8, 10) +
              "/" +
              movimentacao.data_hora.slice(5, 7) +
              "/" +
              movimentacao.data_hora.slice(0, 4) +
              " - " +
              parseInt(movimentacao.data_hora.slice(11, 13)) +
              ":" +
              movimentacao.data_hora.slice(14, 16)}
          </InitialTitle>
        </MovimentacaoView>
      ))}
    </Body>
  );
}

export default Movimentacoes;
