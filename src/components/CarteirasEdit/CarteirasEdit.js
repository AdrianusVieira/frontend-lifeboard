import React, { useState } from "react";
import { Body, Box, CarteiraView } from "./Styles";
import Button from "../../Styles/Button";
import Input from "../../Styles/Input";
import * as managerService from "../../services/managerService";

function CarteirasEdit(props) {
  const [nome, setNome] = useState();

  async function updateCarteiraById(id) {
    await managerService.updateCarteiraById(id, { nome: nome });
    window.location.reload();
  }

  return (
    <Body>
      <Box>
        {props.carteiras?.map((carteira) => (
          <>
            <CarteiraView>
              <Input
                name="nome"
                width="30%"
                placeholder={carteira.nome}
                borderColor="#5700D5"
                color="#5700D5"
                textAlign="center"
                onChange={(e) => setNome(e.target.value)}
              />
              <Button
                onClick={() => {
                  updateCarteiraById(carteira.id_carteira);
                }}
                width="30%"
                backgroundColor="#725AC1"
                height="50px"
              >
                Editar
              </Button>
              <Button
                // onClick={() => {
                //   setComponents("FUNDOS");
                // }}
                width="30%"
                height="50px"
                backgroundColor="#725AC1"
              >
                Deletar Carteira
              </Button>
            </CarteiraView>
          </>
        ))}
      </Box>
    </Body>
  );
}

export default CarteirasEdit;
