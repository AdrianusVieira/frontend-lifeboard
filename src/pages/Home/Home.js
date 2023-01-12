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
  ButtonSection,
} from "./Styles";
import { UserOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { getEmail } from "../../services/auth";
import LoadingScreen from "../../components/LoadingScreen";
import EditProfile from "../../components/EditProfile/EditProfile";
import { sleep } from "../../utils/sleep";
import { useHistory } from "react-router-dom";
import DeleteProfile from "../../components/DeleteProfile";
import Button from "../../Styles/Button";
import * as managerService from "../../services/managerService";

function Home() {
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [total_exp, setTotal_exp] = useState("");
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("");

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
                {state === "EDIT" ? (
                  <>
                    <EditProfile
                      usuario={usuario}
                      fecharEdit={() => setState("")}
                    />
                  </>
                ) : (
                  <>
                    {state === "DELETE" ? (
                      <>
                        <DeleteProfile
                          fecharDelete={() => setState("")}
                          startLoading={() => setLoading(true)}
                        />
                      </>
                    ) : (
                      <>
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
                              <UserOutlined
                                style={{ color: "#E0C3F7", fontSize: "150px" }}
                              />
                            </>
                          )}
                          <AuxiliarSection>
                            <AuxiliarView>
                              <AuxiliarText
                                onClick={() => {
                                  setState("EDIT");
                                }}
                              >
                                Editar Personagem
                              </AuxiliarText>
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
                              <AuxiliarText
                                onClick={() => {
                                  setState("DELETE");
                                }}
                              >
                                Deletar Personagem
                              </AuxiliarText>
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
                          {usuario.patrimonio_total ? (
                            <>
                              <PatrimonyCircle
                                onClick={() => {
                                  history.push("/financeiro");
                                }}
                              >
                                R$ {usuario.patrimonio_total}
                              </PatrimonyCircle>
                            </>
                          ) : (
                            <>
                              <PatrimonyCircle
                                onClick={() => {
                                  history.push("/financeiro");
                                }}
                              >
                                Adicione seu Patrimonio
                              </PatrimonyCircle>
                            </>
                          )}
                        </PatrimonySection>
                      </>
                    )}
                  </>
                )}
              </Box>
              <ButtonSection>
                <Button
                  onClick={() => {
                    history.push("/tarefas");
                  }}
                  width="30%"
                  height="60px"
                >
                  Tarefas
                </Button>
                <Button
                  onClick={() => {
                    history.push("/financeiro");
                  }}
                  width="30%"
                  height="60px"
                >
                  Financeiro
                </Button>
              </ButtonSection>
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
