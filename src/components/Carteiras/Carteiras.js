import React, { useState, useEffect } from "react";
import {
  Body,
  ButtonSection,
  CarteiraView,
  InitialTitle,
  InputSection,
  CreationSection,
} from "./Styles";
import Input from "../../Styles/Input";
import Button from "../../Styles/Button";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import CarteiraCreation from "../CarteiraCreation/CarteiraCreation";
import * as managerService from "../../services/managerService";
import { sleep } from "../../utils/sleep";
import LoadingFinances from "../LoadingFinances";
import CarteirasEdit from "../CarteirasEdit";
import Movimentacoes from "../Movimentacoes/Movimentacoes";
import Relatorios from "../Relatorios/Relatorios";

function Carteiras(props) {
  const [carteiras, setCarteiras] = useState();
  const [components, setComponents] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMovimentacao, setNewMovimentacao] = useState({
    tipo: "",
    data_hora: "",
    descricao: "",
    valor: "",
    id_carteira: "",
  });
  const [id, setId] = useState("");

  async function getCarteiras() {
    const result = await managerService.getCarteirasByUsuario(
      props.usuario.id_usuario
    );
    setCarteiras(result);
  }
  useEffect(() => {
    getCarteiras();
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
    await getCarteiras().then(() => {
      setComponents("");
    });
  }

  function fillingMovimentacaoValue(e) {
    const { value, name } = e.target;
    setNewMovimentacao({ ...newMovimentacao, [name]: value });
  }

  async function creatingMovimentacao(tipo, carteira) {
    setLoading(true);
    newMovimentacao.tipo = tipo;
    const data = new Date();
    data.setHours(data.getHours() - 3);
    newMovimentacao.data_hora = data;
    newMovimentacao.id_carteira = carteira.id_carteira;
    await managerService.createMovimentacao(newMovimentacao);
    var newPatrimonio_Total;
    var newPatrimonioCarteira;
    if (tipo === "DEBIT") {
      newPatrimonio_Total =
        props.usuario.patrimonio_total - newMovimentacao.valor;
      newPatrimonioCarteira = carteira.patrimonio - newMovimentacao.valor;
    } else if (tipo === "CREDIT") {
      newPatrimonio_Total =
        +props.usuario.patrimonio_total + +newMovimentacao.valor;
      newPatrimonioCarteira = +carteira.patrimonio + +newMovimentacao.valor;
    }
    await managerService.updateUsuarioByEmail(props.usuario.email, {
      patrimonio_total: newPatrimonio_Total,
    });
    await managerService.updateCarteiraById(carteira.id_carteira, {
      patrimonio: newPatrimonioCarteira,
    });
    carteira.patrimonio = newPatrimonioCarteira;
    props.getPatrimony();
    setNewMovimentacao({
      tipo: "",
      data_hora: "",
      descricao: "",
      valor: "",
      id_carteira: "",
    });
    await sleep(1500);
    setLoading(false);
  }

  return (
    <Body>
      {components !== "MOVI" ? (
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
              Adicionar Carteira
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
              Editar Carteiras
            </Button>
            <Button
              onClick={() => {
                if (components === "REPORTS") {
                  setComponents("");
                } else {
                  setComponents("REPORTS");
                }
              }}
              width="30%"
              height="60px"
            >
              Exibir Relat??rios
            </Button>
          </ButtonSection>
        </>
      ) : (
        <></>
      )}
      {components === "ADD" ? (
        <CreationSection>
          <CarteiraCreation
            getPatrimony={() => calculatePatrimony()}
            usuario={props.usuario}
          />
        </CreationSection>
      ) : (
        <>
          {components === "REPORTS" ? (
            <>
              <Relatorios carteira="carteira" usuario={props.usuario} />
            </>
          ) : (
            <>
              {components === "EDIT" ? (
                <>
                  <CarteirasEdit
                    calculatePatrimony={() => calculatePatrimony()}
                    carteiras={carteiras}
                  />
                </>
              ) : (
                <>
                  {components === "MOVI" ? (
                    <>
                      <Movimentacoes
                        carteira={id}
                        close={() => setComponents("")}
                      />
                    </>
                  ) : (
                    <>
                      {carteiras?.map((carteira) => (
                        <>
                          <CarteiraView>
                            <InitialTitle>{carteira.nome}</InitialTitle>
                            <InitialTitle>
                              R$ {carteira.patrimonio.toFixed(2)}
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
                                    placeholder="Descri????o:"
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
                                      creatingMovimentacao("CREDIT", carteira);
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
                                      creatingMovimentacao("DEBIT", carteira);
                                    }}
                                  />
                                </InputSection>
                              </>
                            )}

                            <Button
                              onClick={() => {
                                setComponents("MOVI");
                                setId(carteira.id_carteira);
                              }}
                              width="40%"
                              height="50px"
                            >
                              Exibir Movimenta????es
                            </Button>
                          </CarteiraView>
                        </>
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Body>
  );
}

export default Carteiras;
