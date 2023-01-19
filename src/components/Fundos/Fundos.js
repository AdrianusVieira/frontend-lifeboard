import React, { useState, useEffect } from "react";
import {
  Body,
  ButtonSection,
  FundoView,
  InitialTitle,
  InputSection,
  CreationSection,
} from "./Styles";
import Input from "../../Styles/Input";
import Button from "../../Styles/Button";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { sleep } from "../../utils/sleep";
import FundoCreation from "../FundoCreation";
import LoadingFinances from "../LoadingFinances";
import * as managerService from "../../services/managerService";

function Fundos(props) {
  const [fundos, setFundos] = useState();
  const [components, setComponents] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMovimentacao, setNewMovimentacao] = useState({
    tipo: "",
    data_hora: "",
    descricao: "",
    valor: "",
    id_fundo: "",
  });

  async function getFundos() {
    const result = await managerService.getFundosByUsuario(
      props.usuario.id_usuario
    );
    setFundos(result);
  }
  useEffect(() => {
    getFundos();
  }, []);

  async function calculatePatrimony() {
    var totalFundosPatrimony = 0;
    var totalCarteirasPatrimony = 0;
    await managerService
      .getCarteirasByUsuario(props.usuario.id_usuario)
      .then((res) => {
        res.forEach((carteira) => {
          totalCarteirasPatrimony =
            totalCarteirasPatrimony + carteira.patrimonio;
        });
      });
    await managerService
      .getFundosByUsuario(props.usuario.id_usuario)
      .then((res) => {
        res.forEach((fundo) => {
          totalFundosPatrimony = totalFundosPatrimony + fundo.patrimonio;
        });
      });

    const totalPatrimony = totalCarteirasPatrimony + totalFundosPatrimony;
    await managerService.updateUsuarioByEmail(props.usuario.email, {
      patrimonio_total: totalPatrimony,
    });
    props.getPatrimony();
    await getFundos().then(() => {
      setComponents("");
    });
  }

  function fillingMovimentacaoValue(e) {
    const { value, name } = e.target;
    setNewMovimentacao({ ...newMovimentacao, [name]: value });
  }

  async function creatingMovimentacao(tipo, fundo) {
    setLoading(true);
    newMovimentacao.tipo = tipo;
    const data = new Date();
    newMovimentacao.data_hora = data;
    newMovimentacao.id_fundo = fundo.id_fundo;
    await managerService.createMovimentacao(newMovimentacao);
    var newPatrimonio_Total;
    var newPatrimonioFundo;
    if (tipo === "DEBIT") {
      newPatrimonio_Total =
        props.usuario.patrimonio_total - newMovimentacao.valor;
      newPatrimonioFundo = fundo.patrimonio - newMovimentacao.valor;
    } else if (tipo === "CREDIT") {
      newPatrimonio_Total =
        +props.usuario.patrimonio_total + +newMovimentacao.valor;
      newPatrimonioFundo = +fundo.patrimonio + +newMovimentacao.valor;
    }
    await managerService.updateUsuarioByEmail(props.usuario.email, {
      patrimonio_total: newPatrimonio_Total,
    });
    await managerService.updateFundoById(fundo.id_fundo, {
      patrimonio: newPatrimonioFundo,
    });
    fundo.patrimonio = newPatrimonioFundo;
    props.getPatrimony();
    setNewMovimentacao({
      tipo: "",
      data_hora: "",
      descricao: "",
      valor: "",
      id_fundo: "",
    });
    await sleep(1500);
    setLoading(false);
  }

  return (
    <Body>
      <ButtonSection>
        <Button
          onClick={() => {
            if (components === "ADD") {
              setComponents("");
            } else {
              setComponents("ADD");
            }
          }}
          width="30%"
          height="60px"
        >
          Adicionar Fundo
        </Button>
        <Button
          // onClick={() => {
          //   setComponents("FUNDOS");
          // }}
          width="30%"
          height="60px"
        >
          Exibir Relatórios
        </Button>
      </ButtonSection>
      {components === "ADD" ? (
        <CreationSection>
          <FundoCreation
            getPatrimony={() => calculatePatrimony()}
            usuario={props.usuario}
          />
        </CreationSection>
      ) : (
        <>
          {components === "REPORTS" ? (
            <></>
          ) : (
            <>
              {fundos?.map((fundo) => (
                <>
                  <FundoView>
                    <InitialTitle>{fundo.nome}</InitialTitle>
                    <InitialTitle>
                      R$ {fundo.patrimonio.toFixed(2)}
                    </InitialTitle>
                    {loading ? (
                      <>
                        <InputSection>
                          <LoadingFinances />
                        </InputSection>
                      </>
                    ) : (
                      <>
                        {" "}
                        <InputSection>
                          <Input
                            name="descricao"
                            width="80%"
                            placeholder="Descrição:"
                            borderColor="#5700D5"
                            color="#5700D5"
                            textAlign="center"
                            value={newMovimentacao.descricao}
                            onChange={fillingMovimentacaoValue}
                          />
                        </InputSection>
                        <InputSection>
                          <PlusOutlined
                            style={{
                              color: "#5700D5",
                              fontSize: "20px",
                              borderStyle: "solid",
                              borderColor: "#5700D5",
                              borderRadius: "50%",
                              focus: {
                                borderColor: "#745296",
                              },
                            }}
                            onClick={() => {
                              creatingMovimentacao("CREDIT", fundo);
                            }}
                          />
                          <Input
                            name="valor"
                            width="40%"
                            placeholder="Valor:"
                            borderColor="#5700D5"
                            color="#5700D5"
                            textAlign="center"
                            type="number"
                            value={newMovimentacao.valor}
                            onChange={fillingMovimentacaoValue}
                          />
                          <MinusOutlined
                            style={{
                              color: "#5700D5",
                              fontSize: "20px",
                              borderStyle: "solid",
                              borderColor: "#5700D5",
                              borderRadius: "50%",
                            }}
                            onClick={() => {
                              creatingMovimentacao("DEBIT", fundo);
                            }}
                          />
                        </InputSection>
                      </>
                    )}

                    <Button
                      // onClick={() => {
                      //   setComponents("CARTEIRAS");
                      // }}
                      width="40%"
                      height="50px"
                    >
                      Exibir Movimentações
                    </Button>
                  </FundoView>
                </>
              ))}
            </>
          )}
        </>
      )}
    </Body>
  );
}

export default Fundos;
