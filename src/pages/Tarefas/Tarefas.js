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
  LevelSection,
  LevelText,
  TarefasSection,
  TarefasView,
  CalendarView,
  TitleText,
  TarefasList,
  Tarefa,
  TarefaText,
  ToolSection,
  TextSection,
  ButtonSection,
} from "./Styles";
import { useHistory } from "react-router-dom";
import { getEmail } from "../../services/auth";
import { sleep } from "../../utils/sleep";
import {
  UserOutlined,
  LeftCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import * as managerService from "../../services/managerService";
import LoadingFinances from "../../components/LoadingFinances";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Badge, Calendar } from "antd";
import TarefaCreation from "../../components/TarefaCreation";
import { ToolFilled } from "@ant-design/icons";

function Tarefas() {
  dayjs.locale("zh-cn");
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const [total_exp, setTotal_exp] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [components, setComponents] = useState("");
  const [tarefas, setTarefas] = useState("");
  const [dataAuxiliar, setDataAuxiliar] = useState([]);
  const [listaTarefas, setListaTarefas] = useState([]);
  const hoje = new Date();
  let weekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sabado",
  ];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  async function verificarUltimoFeito() {
    for (let i = 0; i < tarefas.length; i++) {
      if (tarefas[i].ultimo_feito !== null || tarefas[i].ultimo_feito !== 0) {
        if (+tarefas[i].ultimo_feito !== +hoje.getDate()) {
          await managerService.updateTarefaById(tarefas[i].id_tarefa, {
            ultimo_feito: 0,
          });
        }
      }
    }
  }

  useEffect(() => {
    verificarUltimoFeito();
  }, [tarefas]);

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

  async function setingTargetDate(date) {
    setListaTarefas([]);
    let aux;
    if (date) {
      aux = new Date(date);
    } else {
      aux = new Date();
    }
    const obj = {
      day: weekDays[aux.getDay()],
      date: aux.getDate(),
      month: months[aux.getMonth()],
    };
    setTargetDate(obj);
    setDataAuxiliar(aux);
    setingListaTarefas(aux);
  }

  async function setingListaTarefas(aux) {
    let array = [];
    let dias = ["0", "1", "2", "3", "4", "5", "6"];
    for (let i = 0; i < tarefas.length; i++) {
      const date = new Date(tarefas[i].data);
      let recorrencia = tarefas[i].recorrencia;
      let ultimo_feito = tarefas[i].ultimo_feito;
      if (
        date.getDate() === aux.getDate() &&
        months[date.getMonth()] === months[aux.getMonth()] &&
        ultimo_feito !== aux.getDate()
      ) {
        array.push(tarefas[i]);
      } else {
        for (const prop in recorrencia) {
          if (dias.includes(recorrencia[prop])) {
            if (
              JSON.stringify(aux.getDay()) === recorrencia[prop] &&
              aux.getDate() >= date.getDate() &&
              months[aux.getMonth()] >= months[date.getMonth()] &&
              ultimo_feito !== aux.getDate()
            ) {
              array.push(tarefas[i]);
            }
          }
        }
      }
    }
    setListaTarefas(array);
  }

  useEffect(() => {
    setingTargetDate();
  }, [tarefas]);

  async function getTarefas() {
    const result = await managerService.getTarefasByUsuario(usuario.id_usuario);
    setTarefas(result);
  }

  useEffect(() => {
    getTarefas();
  }, [usuario]);

  async function aumentarExperiencia(tarefa) {
    let tabela_exp = [100, 80, 50];
    let exp = tabela_exp[+tarefa.urgencia];
    let new_total_exp = usuario.exp_atual + exp;
    if (new_total_exp >= +total_exp) {
      let new_level = usuario.level + 1;
      new_total_exp = +new_total_exp - +total_exp;
      await managerService.updateUsuarioByEmail(usuario.email, {
        level: new_level,
        exp_atual: new_total_exp,
      });
      getUsuario();
      setTotal_exp();
    } else {
      await managerService.updateUsuarioByEmail(usuario.email, {
        exp_atual: new_total_exp,
      });
      getUsuario();
    }
  }
  async function verificarRecorrencia(recorrencia) {
    let dias = ["0", "1", "2", "3", "4", "5", "6"];
    let has_recorrencia = false
    for (const prop in recorrencia) {
      if (dias.includes(recorrencia[prop])) {
        has_recorrencia = true;
      }
    }
    return has_recorrencia;
  }

  async function concludeTarefa(tarefa) {
    await aumentarExperiencia(tarefa);
    const has_recorrencia = await verificarRecorrencia(tarefa.recorrencia);
    if (has_recorrencia === true) {
      await managerService.updateTarefaById(tarefa.id_tarefa, {
        ultimo_feito: dataAuxiliar.getDate(),
      });
    } else {
      await managerService.deleteTarefaById(tarefa.id_tarefa);
    }
    getTarefas();
  }

  async function deleteTarefa(id) {
    await managerService.deleteTarefaById(id);
     getTarefas();
  }

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
              <LevelSection>
                <>
                  <LevelText>Nvl {usuario.level}</LevelText>
                </>
                <>
                  <LevelText>
                    {usuario.exp_atual} / {total_exp} exp
                  </LevelText>
                </>
              </LevelSection>
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
            <TarefasSection>
              <TarefasView>
                <TitleText>{targetDate.day}</TitleText>
                <TitleText>
                  {targetDate.date}/{targetDate.month}
                </TitleText>
                {components === "ADD" ? (
                  <>
                    <TarefaCreation
                      usuario={usuario}
                      date={dataAuxiliar}
                      close={() => {
                        setComponents("");
                        getTarefas();
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TarefasList>
                      {listaTarefas?.map((tarefa) => (
                        <>
                          <Tarefa>
                            <ToolSection>
                              {+tarefa.urgencia === 0 ? (
                                <>
                                  <ToolFilled
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  {+tarefa.urgencia === 1 ? (
                                    <>
                                      <ToolFilled
                                        style={{
                                          color: "yellow",
                                          fontSize: "20px",
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <ToolFilled
                                        style={{
                                          color: "green",
                                          fontSize: "20px",
                                        }}
                                      />
                                    </>
                                  )}
                                </>
                              )}
                            </ToolSection>
                            <TextSection>
                              <TarefaText>{tarefa.descricao}</TarefaText>
                            </TextSection>
                            <ButtonSection>
                              <CloseCircleOutlined
                                style={{
                                  color: "#e0c3f7",
                                  fontSize: "25px",
                                  borderStyle: "solid",
                                  borderColor: "#5700D5",
                                  borderRadius: "50%",
                                  focus: {
                                    borderColor: "#745296",
                                  },
                                }}
                                onClick={() => {
                                  deleteTarefa(tarefa.id_tarefa);
                                }}
                              />
                              {dataAuxiliar.getDate() === hoje.getDate() ? (
                                <>
                                  <CheckCircleOutlined
                                    style={{
                                      color: "#e0c3f7",
                                      fontSize: "25px",
                                      borderStyle: "solid",
                                      borderColor: "#5700D5",
                                      borderRadius: "50%",
                                      focus: {
                                        borderColor: "#745296",
                                      },
                                    }}
                                    onClick={() => {
                                      concludeTarefa(tarefa);
                                    }}
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                            </ButtonSection>
                          </Tarefa>
                        </>
                      ))}
                    </TarefasList>
                    <AuxiliarText
                      onClick={() => {
                        if (components === "ADD") {
                          setComponents("");
                        } else {
                          setComponents("ADD");
                        }
                      }}
                    >
                      Adicionar Tarefa
                    </AuxiliarText>
                  </>
                )}
              </TarefasView>
              <CalendarView>
                <Calendar
                  fullscreen={false}
                  onSelect={(e) => {
                    setingTargetDate(e._d);
                  }}
                />
              </CalendarView>
            </TarefasSection>
          </Base>
        </>
      )}
    </Body>
  );
}

export default Tarefas;
