import React, { useState } from "react";
import { Body, CreationTitle, Box } from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";
import LoadingFinances from "../LoadingFinances";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/managerService";

function FundoCreation(props) {
  const [newFundo, setNewFundo] = useState({
    nome: "",
    patrimonio: 0,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  function fillingFundoData(e) {
    const { value, name } = e.target;
    setNewFundo({ ...newFundo, [name]: value });
  }

  async function createFundo() {
    setLoading(true);
    newFundo.id_usuario = props.usuario.id_usuario;
    if (newFundo.nome !== "") {
      await managerService.createFundo(newFundo).then((res) => {
        if (res) {
          setStatus("SUCESS");
          props.getPatrimony();
        } else {
          setStatus("ERROR");
        }
      });
      setNewFundo({ nome: "", patrimonio: 0 });
      await sleep(4000);
      setLoading(false);
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
                  <CreationTitle>Fundo Criado com Sucesso!</CreationTitle>
                </>
              ) : (
                <></>
              )}
              {status === "ERROR" ? (
                <>
                  <CreationTitle>Falha ao criar a fundo!</CreationTitle>
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
              placeholder="Nome Fundo:"
              onChange={fillingFundoData}
              value={newFundo.nome}
            />
            <Input
              name="patrimonio"
              width="60%"
              placeholder="Patrimonio do Fundo:"
              onChange={fillingFundoData}
              type="number"
              value={newFundo.patrimonio}
            />
            <StartButton onClick={() => createFundo()}>Criar</StartButton>
          </>
        )}
      </Box>
    </Body>
  );
}

export default FundoCreation;
