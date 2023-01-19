import React, { useState } from "react";
import { Body, Box, FundoView } from "./Styles";
import Button from "../../Styles/Button";
import Input from "../../Styles/Input";
import * as managerService from "../../services/managerService";

function FundosEdit(props) {
  const [nome, setNome] = useState();

  async function updateFundoById(id) {
    await managerService.updateFundoById(id, { nome: nome });
    window.location.reload();
  }
  async function deleteFundoById(id) {
    await managerService.deleteFundoById(id);
    props.calculatePatrimony();
    window.location.reload();
  }

  return (
    <Body>
      <Box>
        {props.fundos?.map((fundo) => (
          <>
            <FundoView>
              <Input
                name="nome"
                width="30%"
                placeholder={fundo.nome}
                borderColor="#5700D5"
                color="#5700D5"
                textAlign="center"
                onChange={(e) => setNome(e.target.value)}
              />
              <Button
                onClick={() => {
                  updateFundoById(fundo.id_fundo);
                }}
                width="30%"
                backgroundColor="#725AC1"
                height="50px"
              >
                Editar
              </Button>
              <Button
                onClick={() => {
                  deleteFundoById(fundo.id_fundo);
                }}
                width="30%"
                height="50px"
                backgroundColor="#725AC1"
              >
                Deletar Fundo
              </Button>
            </FundoView>
          </>
        ))}
      </Box>
    </Body>
  );
}

export default FundosEdit;
