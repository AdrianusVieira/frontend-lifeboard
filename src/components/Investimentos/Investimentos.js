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
} from "./Styles";
import Button from "../../Styles/Button";
import * as managerService from "../../services/managerService";
import InvestimentoCreation from "../InvestimentoCreation";
import InvestimentosEdit from "../InvestimentosEdit";
import { Select } from "antd";
import "./Styles.css";
import Input from "../../Styles/Input";

function Investimentos(props) {
  const [investimentos, setInvestimentos] = useState();
  const [investimentosEspecif, setInvestimentosEspecif] = useState();
  const [components, setComponents] = useState("");
  const [newMovimentacao, setNewMovimentacao] = useState({
    tipo: "",
    data_hora: "",
    descricao: "",
    valor: "",
    id_investimento: "",
  });
  const [id, setId] = useState("");
  const [tipo, setTipo] = useState("");

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
  return (
    <Body>
      {components !== "MOVI" && components !== "EXIB" ? (
        <>
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
              Adicionar
            </Button>
            <Button
              onClick={() => {
                if (components === "EDIT") {
                  setComponents("");
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
              {components === "EXIB" ? (
                <>
                  <ReturnSection>
                    <AuxiliarText
                      onClick={() => {
                        setComponents("");
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
                            // defaultValue={newInvestimento.categoria}
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
                            // onChange={(e) => setCategoria(e)}
                            options={[
                              {
                                value: "previdenciaprivada",
                                label: "Previdencia Privada",
                              },
                              {
                                value: "rendavariavel",
                                label: "Renda Variável",
                              },
                              { value: "rendafixa", label: "Renda Fixa" },
                            ]}
                          />
                        </InputSection>
                        <Button
                          // onClick={() => {
                          //   setComponents("MOVI");
                          //   setId(investimento.id_investimento);
                          // }}
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
