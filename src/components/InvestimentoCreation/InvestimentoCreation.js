import React, { useState, useEffect } from "react";
import { Body, CreationTitle, Box } from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";
import LoadingFinances from "../LoadingFinances";
import { sleep } from "../../utils/sleep";
import { Select } from "antd";
import "./Styles.css";
import * as managerService from "../../services/managerService";

function InvestimentoCreation(props) {
  const [newInvestimento, setNewInvestimento] = useState({
    nome: "",
    patrimonio: 0,
    categoria: "Categoria:",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [categoria, setCategoria] = useState("");
  const [restValue, setRestValue] = useState("");

  function fillingInvestimentoData(e) {
    const { value, name } = e.target;
    setNewInvestimento({ ...newInvestimento, [name]: value });
  }
  async function calculateDisponiblePatrimony() {
    const aux = await managerService.getInvestimentosByUsuario(
      props.usuario.id_usuario
    );
    var utilTotal = 0;
    aux.forEach((investimento) => {
      utilTotal = utilTotal + investimento.patrimonio;
    });
    const fundos = await managerService.getFundosByUsuario(
      props.usuario.id_usuario
    );
    var patrimonioInvestimento = 0;
    fundos.forEach((fundo) => {
      if ((fundo.nome = "Fundo para Investimentos")) {
        patrimonioInvestimento = fundo.patrimonio;
      }
    });
    setRestValue(patrimonioInvestimento - utilTotal);
  }
  useEffect(() => {
    calculateDisponiblePatrimony();
  }, []);

  async function createInvestimento() {
    setLoading(true);
    newInvestimento.id_usuario = props.usuario.id_usuario;
    newInvestimento.categoria = categoria;
    if (
      newInvestimento.nome !== "" &&
      newInvestimento.categoria !== "Categoria:" &&
      restValue - newInvestimento.patrimonio >= 0
    ) {
      await managerService.createInvestimento(newInvestimento).then((res) => {
        if (res) {
          setStatus("SUCESS");
        } else {
          setStatus("ERROR");
        }
      });
      setNewInvestimento({ nome: "", patrimonio: 0, categoria: "Categoria:" });
      await sleep(4000);
      calculateDisponiblePatrimony()
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
                  <CreationTitle>
                    Investimento Criado com Sucesso!
                  </CreationTitle>
                </>
              ) : (
                <></>
              )}
              {status === "ERROR" ? (
                <>
                  <CreationTitle>Falha ao criar o Investimento!</CreationTitle>
                </>
              ) : (
                <></>
              )}
            </>
            <LoadingFinances />
          </>
        ) : (
          <>
          <CreationTitle>Sua alocação disponível: {restValue}</CreationTitle>
            <Input
              name="nome"
              width="60%"
              placeholder="Nome Investimento:"
              onChange={fillingInvestimentoData}
              value={newInvestimento.nome}
              marginTop="10px"
            />
            <Select
              defaultValue={newInvestimento.categoria}
              style={{
                width: "60%",
                backgroundColor: "#5700d5",
                textAlign: "left",
                color: "#fffdf7",
                fontSize: "18px",
                fontFamily: "VT323",
                height: "30px",
                borderRadius: "8px",
                borderColor: "#e0c3f7",
                borderWidth: "3px",
                marginTop: "10px",
              }}
              name="categoria"
              onChange={(e) => setCategoria(e)}
              options={[
                { value: "previdenciaprivada", label: "Previdencia Privada" },
                { value: "rendavariavel", label: "Renda Variável" },
                { value: "rendafixa", label: "Renda Fixa" },
              ]}
            />
            <Input
              name="patrimonio"
              width="60%"
              placeholder="Patrimonio do Investimento:"
              onChange={fillingInvestimentoData}
              type="number"
              marginTop="10px"
              value={newInvestimento.patrimonio}
            />
            <StartButton marginTop="10px" onClick={() => createInvestimento()}>
              Criar
            </StartButton>
          </>
        )}
      </Box>
    </Body>
  );
}

export default InvestimentoCreation;
