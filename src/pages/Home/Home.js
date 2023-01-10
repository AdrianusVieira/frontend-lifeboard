import React, { useState, useEffect } from "react";
import ErrorScreen from "../../components/ErrorScreen";
import {
  Base,
  Body,
  Box,
  DataSection,
  DataText,
  LevelSection,
  LevelText,
  PhotoSection,
  ExpText,
  ExpView,
  BarView,
  PatrimonySection,
  PatrimonyText,
  PatrimonyCircle,
  PatrimonyCircleText,
  AuxiliarSection,
  AuxiliarText,
  AuxiliarView,
} from "./Styles";
import { UserOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { getEmail } from "../../services/auth";
import LoadingScreen from "../../components/LoadingScreen";
import { sleep } from "../../utils/sleep";
import { useHistory } from "react-router-dom";
import * as managerService from "../../services/managerService";

function Home() {
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [total_exp, setTotal_exp] = useState("");
  const [percent, setPercent] = useState(0);
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

  function calculatingTotalExp() {
    var sum1 = usuario.level * 100;
    var sum2 = 0.4 * sum1;
    setTotal_exp(sum1 + sum2);
  }

  useEffect(() => {
    calculatingTotalExp();
  }, [usuario]);

  async function calculatingBarPercent() {
    const aux = (usuario.exp_atual * 100) / total_exp;
    await sleep(200);
    setPercent(aux);
  }
  useEffect(() => {
    calculatingBarPercent();
  }, [total_exp]);

  return (
    <Body>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          {usuario ? (
            <Base>
              <Box>
                <PhotoSection>
                  {usuario.foto ? (
                    <>
                      <img
                        src={usuario.foto}
                        className="foto"
                        alt="fotoPerfil"
                        height="70%"
                        width="70%"
                      ></img>
                    </>
                  ) : (
                    <>
                      {" "}
                      <UserOutlined style={{ color: "#E0C3F7", fontSize:"150px" }} />
                    </>
                  )}

                  <AuxiliarSection>
                    <AuxiliarView>
                      <AuxiliarText>Editar Personagem</AuxiliarText>
                    </AuxiliarView>
                    <AuxiliarView>
                      <AuxiliarText
                        onClick={() => {
                          history.push("/login");
                        }}
                      >
                        Trocar Personagem
                      </AuxiliarText>
                    </AuxiliarView>
                    <AuxiliarView>
                      <AuxiliarText>Deletar Personagem</AuxiliarText>
                    </AuxiliarView>
                  </AuxiliarSection>
                </PhotoSection>
                <DataSection>
                  <DataText>{usuario.nome}</DataText>
                  <DataText>{usuario.email}</DataText>
                  <DataText>{usuario.data_nascimento}</DataText>
                  <LevelText>Lvl: {usuario.level}</LevelText>
                  <LevelSection>
                    <BarView>
                      <Progress
                        percent={percent}
                        strokeColor="#e0c3f7"
                        trailColor="#745296"
                        showInfo={false}
                      />
                    </BarView>
                    <ExpView>
                      <ExpText>
                        {usuario.exp_atual} / {total_exp}
                      </ExpText>
                    </ExpView>
                  </LevelSection>
                </DataSection>
                <PatrimonySection>
                  <PatrimonyText>Patrimonio Total</PatrimonyText>
                  <PatrimonyCircle>R$ 1000.00</PatrimonyCircle>
                </PatrimonySection>
              </Box>
            </Base>
          ) : (
            <ErrorScreen />
          )}
        </>
      )}
    </Body>
  );
}

export default Home;
