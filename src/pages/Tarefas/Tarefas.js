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
} from "./Styles";
import { useHistory } from "react-router-dom";
import { getEmail } from "../../services/auth";
import { sleep } from "../../utils/sleep";
import { UserOutlined, LeftCircleOutlined } from "@ant-design/icons";
import * as managerService from "../../services/managerService";
import LoadingFinances from "../../components/LoadingFinances";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Badge, Calendar } from "antd";
import TarefaCreation from "../../components/TarefaCreation";

function Tarefas() {
  dayjs.locale("zh-cn");
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const [total_exp, setTotal_exp] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [components, setComponents] = useState("");
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

  function setingTargetDate(date) {
    let aux;
    if (date) {
      aux = new Date(date);
    } else {
      aux = new Date();
    }
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
    const obj = {
      day: weekDays[aux.getDay()],
      date: aux.getDate(),
      month: months[aux.getMonth()],
    };
    setTargetDate(obj);
  }

  useEffect(() => {
    setingTargetDate();
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
                    <TarefaCreation usuario={usuario} date={targetDate} close={()=>setComponents("")} />
                  </>
                ) : (
                  <>
                    <TarefasList></TarefasList>
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
