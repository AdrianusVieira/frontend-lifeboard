import React, { useState, useEffect } from "react";
import {
  AuxiliarText,
  Body,
  ButtonSection,
  CreationSection,
  ReturnSection,
  InvestimentoView,
  InitialTitle,
  InputSection,
  CreationTitle,
} from "./Styles";
import Button from "../../Styles/Button";
import * as managerService from "../../services/managerService";
import InvestimentoCreation from "../InvestimentoCreation";
import InvestimentosEdit from "../InvestimentosEdit";
import { Select } from "antd";
import "./Styles.css";
import Input from "../../Styles/Input";
import { CheckCircleOutlined } from "@ant-design/icons";
import LoadingFinances from "../LoadingFinances";
import { sleep } from "../../utils/sleep";
import Movimentacoes from "../Movimentacoes";

function Investimentos(props) {
  const [investimentos, setInvestimentos] = useState();
  const [investimentosEspecif, setInvestimentosEspecif] = useState();
  const [status, setStatus] = useState();
  const [components, setComponents] = useState("");
  const [newMovimentacao, setNewMovimentacao] = useState({
    tipo: "Selecione o tipo:",
    data_hora: "",
    descricao: "",
    valor: "",
    id_investimento: "",
  });
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState("");
  const [restValue, setRestValue] = useState("");
  const [fundoInvestimento, setFundoInvestimento] = useState("");

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
  }

  function fillingMovimentacaoValue(e) {
    const { value, name } = e.target;
    setNewMovimentacao({ ...newMovimentacao, [name]: value });
  }

  async function getInvestimentos() {
    const result = await managerService.getInvestimentosByUsuario(
      props.usuario.id_usuario
    );
    setInvestimentos(result);
  }
  useEffect(() => {
    getInvestimentos();
  }, []);
  async function getInvestimentosByCategoria(categoria) {
    const result = await managerService.getInvestimentosByCategoria(categoria);
    setInvestimentosEspecif(result);
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
        setFundoInvestimento(fundo);
      }
    });
    setRestValue(+patrimonioInvestimento - +utilTotal);
  }
  useEffect(() => {
    calculateDisponiblePatrimony();
  }, []);

  async function setMovimentacao(investimento) {
    setLoading(true);
    const data = new Date();
    data.setHours(data.getHours() - 3);
    newMovimentacao.data_hora = data;
    newMovimentacao.id_investimento = investimento.id_investimento;

    if (tipo === "novovalor") {
      if (+newMovimentacao.valor >= investimento.patrimonio) {
        const aux = +newMovimentacao.valor - +investimento.patrimonio;
        newMovimentacao.valor = aux;
        newMovimentacao.descricao = "Crescimento";
        newMovimentacao.tipo = "INCREASE";
      } else if (+newMovimentacao.valor <= investimento.patrimonio) {
        const aux = +investimento.patrimonio - +newMovimentacao.valor;
        newMovimentacao.valor = aux;
        newMovimentacao.descricao = "Decrescimento";
        newMovimentacao.tipo = "DECREASE";
      }
    } else if (tipo === "aporte") {
      newMovimentacao.descricao = "Aporte";
      newMovimentacao.tipo = "CONTRIBUITION";
    } else if (tipo === "retirada") {
      newMovimentacao.descricao = "Retirada";
      newMovimentacao.tipo = "REMOVAL";
    } else if (tipo === "rendimento") {
      newMovimentacao.descricao = "Rendimento";
      newMovimentacao.tipo = "INCOME";
    }
    createMovimentacao(newMovimentacao, investimento);
  }

  async function createMovimentacao(movimentacao, investimento) {
    await managerService.createMovimentacao(movimentacao);
    let newPatrimonioFundo;
    let newPatrimonioInvestimento;
    if (movimentacao.tipo === "INCREASE") {
      newPatrimonioFundo = +fundoInvestimento.patrimonio + +movimentacao.valor;
      newPatrimonioInvestimento =
        +investimento.patrimonio + +movimentacao.valor;
    } else if (movimentacao.tipo === "DECREASE") {
      newPatrimonioFundo = +fundoInvestimento.patrimonio - +movimentacao.valor;
      newPatrimonioInvestimento =
        +investimento.patrimonio - +movimentacao.valor;
    } else if (movimentacao.tipo === "INCOME") {
      newPatrimonioFundo = +fundoInvestimento.patrimonio + +movimentacao.valor;
      newPatrimonioInvestimento = +investimento.patrimonio;
    } else if (movimentacao.tipo === "CONTRIBUITION") {
      newPatrimonioFundo = +fundoInvestimento.patrimonio;
      newPatrimonioInvestimento =
        +investimento.patrimonio + +movimentacao.valor;
    } else if (movimentacao.tipo === "REMOVAL") {
      newPatrimonioFundo = +fundoInvestimento.patrimonio;
      newPatrimonioInvestimento =
        +investimento.patrimonio - +movimentacao.valor;
    }
    if (
      movimentacao.tipo === "CONTRIBUITION" &&
      movimentacao.valor > restValue
    ) {
      setStatus("ERROR");
    } else if (newPatrimonioInvestimento < 0) {
      setStatus("ERROR");
    } else {
      setStatus("SUCCESS");
      await managerService.updateFundoById(fundoInvestimento.id_fundo, {
        patrimonio: newPatrimonioFundo,
      });
      await managerService.updateInvestimentoById(
        investimento.id_investimento,
        {
          patrimonio: newPatrimonioInvestimento,
        }
      );
      investimento.patrimonio = newPatrimonioInvestimento;
    }
    await calculatePatrimony();
    await calculateDisponiblePatrimony();
    setNewMovimentacao({
      tipo: "Selecione o tipo:",
      data_hora: "",
      descricao: "",
      valor: "",
      id_investimento: "",
    });
    await sleep(1500);
    setLoading(false);
  }

  return (
    <Body>
      {components !== "MOVI" && components !== "EXIB" ? (
        <>
          <ButtonSection>
            <Button
              onClick={() => {
                if (components === "ADD") {
                  setComponents("");
                  calculateDisponiblePatrimony();
                } else {
                  setComponents("ADD");
                }
              }}
              width="30%"
              height="60px"
            >
              Adicionar
            </Button>
            <Button
              onClick={() => {
                if (components === "EDIT") {
                  setComponents("");
                  calculateDisponiblePatrimony();
                } else {
                  setComponents("EDIT");
                }
              }}
              width="30%"
              height="60px"
            >
              Editar
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
          {components === "" ? (
            <>
              <ButtonSection>
                <Button
                  onClick={() => {
                    setComponents("EXIB");
                    getInvestimentosByCategoria("previdenciaprivada");
                  }}
                  width="30%"
                  height="50px"
                >
                  Previdencia Privada
                </Button>
                <Button
                  onClick={() => {
                    setComponents("EXIB");
                    getInvestimentosByCategoria("rendavariavel");
                  }}
                  width="30%"
                  height="50px"
                >
                  Renda Variável
                </Button>
                <Button
                  onClick={() => {
                    setComponents("EXIB");
                    getInvestimentosByCategoria("rendafixa");
                  }}
                  width="30%"
                  height="50px"
                >
                  Renda Fixa
                </Button>
              </ButtonSection>
              <CreationTitle>
                Sua alocação disponível: {restValue}
              </CreationTitle>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {components === "ADD" ? (
        <CreationSection>
          <InvestimentoCreation usuario={props.usuario} />
        </CreationSection>
      ) : (
        <>
          {components === "EDIT" ? (
            <>
              <InvestimentosEdit investimentos={investimentos} />
            </>
          ) : (
            <>
              {components === "MOVI" ? (
                <>
                  <>
                    <Movimentacoes investimento={id} close={() => setComponents("EXIB")} />
                  </>
                </>
              ) : (
                <></>
              )}
              {components === "EXIB" ? (
                <>
                  <ReturnSection>
                    <AuxiliarText
                      onClick={() => {
                        setComponents("");
                        calculateDisponiblePatrimony();
                      }}
                    >
                      Voltar
                    </AuxiliarText>
                  </ReturnSection>
                  {investimentosEspecif?.map((investimento) => (
                    <>
                      <InvestimentoView>
                        <InitialTitle>{investimento.nome}</InitialTitle>
                        <InitialTitle>
                          R$ {investimento.patrimonio.toFixed(2)}
                        </InitialTitle>
                        {loading ? (
                          <>
                            <>
                              {status === "SUCCESS" ? (
                                <>
                                  <CreationTitle>
                                    Movimentação criada com Sucesso!
                                  </CreationTitle>
                                </>
                              ) : (
                                <></>
                              )}
                              {status === "ERROR" ? (
                                <>
                                  <CreationTitle>
                                    Falha ao criar a Movimentação!
                                  </CreationTitle>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                            <InputSection>
                              <LoadingFinances />
                            </InputSection>
                          </>
                        ) : (
                          <>
                            <InputSection>
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
                              <Select
                                defaultValue={newMovimentacao.tipo}
                                style={{
                                  width: "40%",
                                  backgroundColor: "#5700d5",
                                  textAlign: "left",
                                  color: "#fffdf7",
                                  fontSize: "18px",
                                  fontFamily: "VT323",
                                  height: "30px",
                                  borderRadius: "8px",
                                  borderColor: "#e0c3f7",
                                  borderWidth: "3px",
                                }}
                                onChange={(e) => setTipo(e)}
                                options={[
                                  {
                                    value: "novovalor",
                                    label: "Novo Valor",
                                  },
                                  {
                                    value: "aporte",
                                    label: "Aporte",
                                  },
                                  { value: "retirada", label: "Retirada" },
                                  { value: "rendimento", label: "Rendimento" },
                                ]}
                              />
                              <CheckCircleOutlined
                                style={{
                                  color: "#5700D5",
                                  fontSize: "25px",
                                  borderStyle: "solid",
                                  borderColor: "#5700D5",
                                  borderRadius: "50%",
                                  focus: {
                                    borderColor: "#745296",
                                  },
                                }}
                                onClick={() => {
                                  setMovimentacao(investimento);
                                }}
                              />
                            </InputSection>
                          </>
                        )}

                        <Button
                          onClick={() => {
                            setComponents("MOVI");
                            setId(investimento.id_investimento);
                          }}
                          width="40%"
                          height="50px"
                        >
                          Exibir Movimentações
                        </Button>
                      </InvestimentoView>
                    </>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </Body>
  );
}

export default Investimentos;
