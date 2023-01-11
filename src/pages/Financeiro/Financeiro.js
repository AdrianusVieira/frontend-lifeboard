import React, { useState, useEffect } from "react";
import {
  Body,
  Box,
  Base,
  PhotoSection,
  PatrimonySection,
  ReturnSection,
  PatrimonyText,
  AuxiliarText,
} from "./Styles";
import { useHistory } from "react-router-dom";
import { getEmail } from "../../services/auth";
import { sleep } from "../../utils/sleep";
import { UserOutlined, LeftCircleOutlined } from "@ant-design/icons";
import * as managerService from "../../services/managerService";
import LoadingFinances from "../../components/LoadingFinances";
import FinancesInitial from "../../components/FinancesInitial";

function Financeiro() {
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);

  async function getUsuario() {
    const email = getEmail();
    const result = await managerService.getUsuarioByEmail(email);
    await sleep(4000);
    setLoading(false);
    if (result) {
      setUsuario(result);
    } else {
      setUsuario("");
    }
  }

  useEffect(() => {
    getUsuario();
  }, []);

  return (
    <Body>
      {loading ? (
        <>
          <LoadingFinances />
        </>
      ) : (
        <>
          <Base>
            <Box>
              <PhotoSection>
                {usuario.foto ? (
                  <>
                    <img
                      src={usuario.foto}
                      className="foto"
                      alt="fotoPerfil"
                      height="100%"
                      width="100%"
                    ></img>
                  </>
                ) : (
                  <>
                    <UserOutlined
                      style={{ color: "#E0C3F7", fontSize: "80px" }}
                    />
                  </>
                )}
              </PhotoSection>
              <PatrimonySection>
                {usuario.patrimonio_total ? (
                  <>
                    <PatrimonyText>R$ {usuario.patrimonio_total}</PatrimonyText>
                  </>
                ) : (
                  <>
                    <PatrimonyText>Adicione seu Patrimonio</PatrimonyText>
                  </>
                )}
              </PatrimonySection>
              <ReturnSection>
                <LeftCircleOutlined
                  onClick={() => {
                    history.push("/home");
                  }}
                  style={{ color: "#fffdf7", fontSize: "16px" }}
                />
                <AuxiliarText
                  onClick={() => {
                    history.push("/home");
                  }}
                >
                  Voltar
                </AuxiliarText>
              </ReturnSection>
            </Box>
            {usuario.patrimonio_total ? (
              <></>
            ) : (
              <>
                <FinancesInitial usuario={usuario} />
              </>
            )}
          </Base>
        </>
      )}
    </Body>
  );
}

export default Financeiro;
