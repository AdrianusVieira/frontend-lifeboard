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
    for (let i = 0; i < tarefas.length; i++) {
      const date = new Date(tarefas[i].data);
      if (
        (date.getDate() === aux.getDate() &&
          months[date.getMonth()] === months[aux.getMonth()])
      ) {
        array.push(tarefas[i]);
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
                              />
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
                                // onClick={() => {
                                //   setMovimentacao(investimento);
                                // }}
                              />
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
                  onChange={(e) => {
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
