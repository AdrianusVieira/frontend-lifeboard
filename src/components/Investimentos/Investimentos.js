import React, { useState, useEffect } from "react";
import { Body, ButtonSection, CreationSection } from "./Styles";
import Button from "../../Styles/Button";
import * as managerService from "../../services/managerService";
import InvestimentoCreation from "../InvestimentoCreation";
import InvestimentosEdit from "../InvestimentosEdit";

function Investimentos(props) {
  const [investimentos, setInvestimentos] = useState();
  const [components, setComponents] = useState("");
  async function getInvestimentos() {
    const result = await managerService.getInvestimentosByUsuario(
      props.usuario.id_usuario
    );
    setInvestimentos(result);
  }
  useEffect(() => {
    getInvestimentos();
  }, []);

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
                  if (components === "ADD") {
                    setComponents("");
                  } else {
                    setComponents("ADD");
                  }
                }}
                width="30%"
                height="50px"
              >
                Previdencia Privada
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
                height="50px"
              >
                Renda Variável
              </Button>
              <Button
                // onClick={() => {
                //   setComponents("FUNDOS");
                // }}
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
              <InvestimentosEdit investimentos={investimentos}/>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Body>
  );
}

export default Investimentos;
