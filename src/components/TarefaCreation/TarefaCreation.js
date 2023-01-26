import React, { useState, useEffect } from "react";
import {
  Body,
  CreationTitle,
  Box,
  AuxiliarText,
  AuxiliarSection,
} from "./Styles";
import Input from "../../Styles/Input";
import StartButton from "../../Styles/StartButton";
import LoadingFinances from "../LoadingFinances";
import { sleep } from "../../utils/sleep";
import { Select } from "antd";
import * as managerService from "../../services/managerService";

function TarefaCreation(props) {
  const [newTarefa, setNewTarefa] = useState({
    descricao: "",
    urgencia: "Selecione a Urgência:",
    recorrencia: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const [recorrencia, setRecorrencia] = useState("");

  function fillingTarefaData(e) {
    const { value, name } = e.target;
    setNewTarefa({ ...newTarefa, [name]: value });
  }

  async function createTarefa() {
    setLoading(true);
    newTarefa.id_usuario = props.usuario.id_usuario;
    newTarefa.urgencia = urgencia;
    newTarefa.data = props.date;
    newTarefa.recorrencia = {recorrencia};
    if (
      newTarefa.descricao !== "" &&
      newTarefa.urgencia !== "Selecione a Urgência:" &&
      newTarefa.recorrencia !== ""
    ) {
      await managerService.createTarefa(newTarefa).then((res) => {
        if (res) {
          setStatus("SUCCESS");
        } else {
          setStatus("ERROR");
        }
      });
      setNewTarefa({
        descricao: "",
        urgencia: "Selecione a Urgência:",
        recorrencia: "",
      });
      await sleep(3000);
      setLoading(false);
    } else {
      setStatus("ERROR");
      await sleep(3000);
      setLoading(false);
    }
  }

  return (
    <Body>
      <Box>
        {loading ? (
          <>
            <>
              {status === "SUCCESS" ? (
                <>
                  <CreationTitle>Tarefa Criado com Sucesso!</CreationTitle>
                </>
              ) : (
                <></>
              )}
              {status === "ERROR" ? (
                <>
                  <CreationTitle>Falha ao criar o Tarefa!</CreationTitle>
                </>
              ) : (
                <></>
              )}
            </>
            <LoadingFinances />
          </>
        ) : (
          <>
            <AuxiliarSection>
              <AuxiliarText
                onClick={() => {
                  props.close();
                }}
              >
                Voltar
              </AuxiliarText>
            </AuxiliarSection>
            <Input
              name="descricao"
              width="60%"
              placeholder="Descrição da Tarefa:"
              onChange={fillingTarefaData}
              value={newTarefa.descricao}
              marginTop="10px"
            />
            <Select
              defaultValue={newTarefa.urgencia}
              style={{
                width: "60%",
                backgroundColor: "#5700d5",
                textAlign: "left",
                color: "#fffdf7",
                fontSize: "18px",
                fontFamily: "VT323",
                height: "30px",
                borderRadius: "8px",
                borderColor: "#e0c3f7",
                borderWidth: "3px",
                marginTop: "10px",
              }}
              onChange={(e) => setUrgencia(e)}
              options={[
                { value: "0", label: "Urgente" },
                { value: "1", label: "Importante" },
                { value: "2", label: "Comum" },
              ]}
            />
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "60%",
                backgroundColor: "#5700d5",
                textAlign: "left",
                color: "#fffdf7",
                fontSize: "14px",
                fontFamily: "VT323",
                height: "30px",
                borderRadius: "8px",
                borderColor: "#e0c3f7",
                borderWidth: "3px",
                marginTop: "10px",
              }}
              placeholder="Selecione a Recorrencia:"
              onChange={(e) => setRecorrencia(e)}
              options={[
                { value: "0", label: "Domingo" },
                { value: "1", label: "Segunda-Feira" },
                { value: "2", label: "Terça-Feira" },
                { value: "3", label: "Quarta-Feira" },
                { value: "4", label: "Quinta-Feira" },
                { value: "5", label: "Sexta-Feira" },
                { value: "6", label: "Sabado" },
              ]}
            />
            <StartButton marginTop="10px" onClick={() => createTarefa()}>
              Criar
            </StartButton>
          </>
        )}
      </Box>
    </Body>
  );
}

export default TarefaCreation;
