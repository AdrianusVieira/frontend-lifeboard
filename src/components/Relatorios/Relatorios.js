import React, { useState, useEffect } from "react";
import { Body, RelatorioView } from "./Styles";
import * as managerService from "../../services/managerService";
import { Timeline } from "antd";

function Relatorios(props) {
  const [relatorios, setRelatorios] = useState();
  async function getRelatorios() {
    let res;
    let categoria;
    let tipo
    if (props.carteira) {
      res = await managerService.getRelatorios("carteira");
      categoria = await managerService.getCarteirasByUsuario(
        props.usuario.id_usuario
      );
      tipo='carteira'
    } else if (props.fundo) {
      res = await managerService.getRelatorios("fundo");
      categoria = await managerService.getFundosByUsuario(
        props.usuario.id_usuario
      );
      tipo='fundo'
    } else if (props.investimento) {
      res = await managerService.getRelatorios("investimento");
      categoria = await managerService.getInvestimentosByUsuario(
        props.usuario.id_usuario
      );
      tipo='investimento'
    }
    separatingRelatorios(res, categoria,tipo);
  }
  useEffect(() => {
    getRelatorios();
  }, [props]);

  async function separatingRelatorios(relatorios, categoria,tipo) {
    let aux = [];
    for (var i = 0; i < categoria.length; i++) {
      const array = relatorios.filter(
        (relatorio) => relatorio[`id_${tipo}`] === categoria[[`id_${tipo}`]]
      );
      aux.push(array)
    }
    console.log(
      "🚀 ~ file: Relatorios.js:47 ~ separatingRelatorios ~ aux",
      aux
    );
    setRelatorios(aux)
  }
    

  return <Body></Body>;
}

export default Relatorios;
