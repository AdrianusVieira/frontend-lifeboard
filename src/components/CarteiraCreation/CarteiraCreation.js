import React, { useState } from "react";
import { Body, CreationTitle, Box } from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";
import LoadingFinances from "../LoadingFinances";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/managerService";

function CarteiraCreation(props) {
  const [newCarteira, setNewCarteira] = useState({
    nome: "",
    patrimonio: 0,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  function fillingCarteiraData(e) {
    const { value, name } = e.target;
    setNewCarteira({ ...newCarteira, [name]: value });
  }

  async function createCarteira() {
    setLoading(true);
    newCarteira.id_usuario = props.usuario.id_usuario;
    if (newCarteira.nome !== "") {
      await managerService.createCarteira(newCarteira).then((res) => {
        if (res) {
          setStatus("SUCESS");
        } else {
          setStatus("ERROR");
        }
      });
      setNewCarteira({ nome: "", patrimonio: 0 });
      await sleep(4000);
      setLoading(false);
      props.getPatrimony();
    } else {
      setStatus("ERROR");
      await sleep(4000);
      setLoading(false);
    }
  }

  return (
    <Body>
      <Box>
        {loading ? (
          <>
            <>
              {status === "SUCESS" ? (
                <>
                  <CreationTitle>Carteira Criada com Sucesso!</CreationTitle>
                </>
              ) : (
                <></>
              )}
              {status === "ERROR" ? (
                <>
                  <CreationTitle>Falha ao criar a carteira!</CreationTitle>
                </>
              ) : (
                <></>
              )}
            </>
            <LoadingFinances />
          </>
        ) : (
          <>
            <Input
              name="nome"
              width="60%"
              placeholder="Nome Carteira:"
              onChange={fillingCarteiraData}
              value={newCarteira.nome}
              marginTop="10px"
            />
            <Input
              name="patrimonio"
              width="60%"
              placeholder="Patrimonio da Carteira:"
              onChange={fillingCarteiraData}
              type="number"
              value={newCarteira.patrimonio}
              marginTop="10px"
            />
            <StartButton marginTop="10px" onClick={() => createCarteira()}>
              Criar
            </StartButton>
          </>
        )}
      </Box>
    </Body>
  );
}

export default CarteiraCreation;
