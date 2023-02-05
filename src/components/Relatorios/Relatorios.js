import React, { useState, useEffect } from "react";
import { Body, InitialTitle, RelatorioView } from "./Styles";
import * as managerService from "../../services/managerService";
import { Timeline } from "antd";

function Relatorios(props) {
  const [relatorios, setRelatorios] = useState();
  const [relatoriosMultiplos, setRelatoriosMultiplos] = useState();
  const [categoria, setCategoria] = useState();
  const [tipo, setTipo] = useState();

  async function getRelatorios() {
    let res;
    let categoria;
    let tipo;
    if (props.carteira) {
      res = await managerService.getRelatorios("carteira");
      categoria = await managerService.getCarteirasByUsuario(
        props.usuario.id_usuario
      );
      tipo = "carteira";
    } else if (props.fundo) {
      res = await managerService.getRelatorios("fundo");
      categoria = await managerService.getFundosByUsuario(
        props.usuario.id_usuario
      );
      tipo = "fundo";
    } else if (props.investimento) {
      res = await managerService.getRelatorios("investimento");
      categoria = await managerService.getInvestimentosByUsuario(
        props.usuario.id_usuario
      );
      tipo = "investimento";
    }
    setCategoria(categoria);
    setTipo(tipo);
    setRelatorios(res);
  }
  useEffect(() => {
    getRelatorios();
  }, [props]);

  return (
    <Body>
      {categoria?.map((categoria) => (
        <RelatorioView>
          <InitialTitle>{categoria.nome}</InitialTitle>
          <Timeline>
            {relatorios
              ?.filter(
                (relatorio) =>
                  relatorio[`id_${tipo}`] === categoria[`id_${tipo}`]
              )
              .map((relatorio) => (
                <Timeline.Item>
                  {new Date(relatorio.data_hora).getDate() < 10 ? (
                    <>0{new Date(relatorio.data_hora).getDate()}</>
                  ) : (
                    <>{new Date(relatorio.data_hora).getDate()}</>
                  )}
                  /
                  {new Date(relatorio.data_hora).getMonth() < 10 ? (
                    <>0{new Date(relatorio.data_hora).getMonth()}</>
                  ) : (
                    <>{new Date(relatorio.data_hora).getMonth()}</>
                  )}
                  /{new Date(relatorio.data_hora).getFullYear()} - R$
                  {relatorio.valor.toFixed(2)}
                </Timeline.Item>
              ))}
          </Timeline>
        </RelatorioView>
      ))}
      {relatorios?.map((relatorio) => (
        <></>
      ))}
      {relatoriosMultiplos?.map((relatorio) => (
        <></>
      ))}
    </Body>
  );
}

export default Relatorios;
