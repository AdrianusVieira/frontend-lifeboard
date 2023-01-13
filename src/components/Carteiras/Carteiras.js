import React, { useState, useEffect } from "react";
import { Body, ButtonSection, CarteiraView, InitialTitle, InputSection } from "./Styles";
import Input from "../../Styles/Input";
import Button from "../../Styles/Button";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import * as managerService from "../../services/managerService";

function Carteiras(props) {
  const [carteiras, setCarteiras] = useState();

  async function getCarteiras() {
    const result = await managerService.getCarteirasByUsuario(
      props.usuario.id_usuario
    );
    setCarteiras(result);
  }
  useEffect(() => {
    getCarteiras();
  }, []);

  return (
    <Body>
      <ButtonSection>
        <Button
          // onClick={() => {
          //   setComponents("CARTEIRAS");
          // }}
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
      {carteiras?.map((carteira) => (
        <>
          <CarteiraView>
            <InitialTitle>{carteira.nome}</InitialTitle>
            <InitialTitle>R$ {carteira.patrimonio}</InitialTitle>
            <InputSection>
              <PlusOutlined
                style={{
                  color: "#5700D5",
                  fontSize: "20px",
                  borderStyle: "solid",
                  borderColor: "#5700D5",
                  borderRadius: "50%",
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
                // onChange={fillingUsuarioData}
              />
              <MinusOutlined
                style={{
                  color: "#5700D5",
                  fontSize: "20px",
                  borderStyle: "solid",
                  borderColor: "#5700D5",
                  borderRadius: "50%",
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
    </Body>
  );
}

export default Carteiras;
