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

function Carteiras(props) {
  const [carteiras, setCarteiras] = useState();
  const [components, setComponents] = useState("");
  const [newMovimentacao, setNewMovimentacao] = useState({
    tipo: "",
    data_hora: "",
    descricao: "",
    valor: 0,
    id_carteira: "",
  });

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
    newMovimentacao.tipo = tipo;
    const data = new Date();
    newMovimentacao.data_hora = data;
    newMovimentacao.id_carteira = carteira.id_carteira;
    await managerService.createMovimentacao(newMovimentacao);
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
          Adicionar Carteira
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
          <CarteiraCreation
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
              {carteiras?.map((carteira) => (
                <>
                  <CarteiraView>
                    <InitialTitle>{carteira.nome}</InitialTitle>
                    <InitialTitle>R$ {carteira.patrimonio}</InitialTitle>
                    <InputSection>
                      <Input
                        name="descricao"
                        width="80%"
                        placeholder="Descrição:"
                        borderColor="#5700D5"
                        color="#5700D5"
                        textAlign="center"
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
                    <Button
                      // onClick={() => {
                      //   setComponents("CARTEIRAS");
                      // }}
                      width="40%"
                      height="50px"
                    >
                      Exibir Movimentações
                    </Button>
                  </CarteiraView>
                </>
              ))}
            </>
          )}
        </>
      )}
    </Body>
  );
}

export default Carteiras;
