import React, { useState } from "react";
import { Body, InvestimentoView } from "./Styles";
import Button from "../../Styles/Button";
import Input from "../../Styles/Input";
import * as managerService from "../../services/managerService";

function InvestimentosEdit(props) {
  const [nome, setNome] = useState();

  async function updateInvestimentoById(id) {
    await managerService.updateInvestimentoById(id, { nome: nome });
    window.location.reload();
  }
  async function deleteInvestimentoById(id) {
    await managerService.deleteInvestimentoById(id);
    window.location.reload();
  }

  return (
    <Body>
      {props.investimentos?.map((investimento) => (
        <>
          <>
            <InvestimentoView>
              <Input
                name="nome"
                width="30%"
                placeholder={investimento.nome}
                borderColor="#5700D5"
                color="#5700D5"
                textAlign="center"
                onChange={(e) => setNome(e.target.value)}
              />
              <Button
                onClick={() => {
                  updateInvestimentoById(investimento.id_investimento);
                }}
                width="30%"
                backgroundColor="#725AC1"
                height="50px"
              >
                Editar
              </Button>
              <Button
                onClick={() => {
                  deleteInvestimentoById(investimento.id_investimento);
                }}
                width="30%"
                height="50px"
                backgroundColor="#725AC1"
              >
                Deletar
              </Button>
            </InvestimentoView>
          </>
          <></>
        </>
      ))}
    </Body>
  );
}

export default InvestimentosEdit;
