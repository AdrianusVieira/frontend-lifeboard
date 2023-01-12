import React, { useState, useEffect } from "react";
import { Body } from "./Styles";
import * as managerService from "../../services/managerService";

function Investimentos(props) {
const [investimentos, setInvestimentos] = useState();

// async function getFundos() {
//   const result = await managerService.getFundosByUsuario(
//     props.usuario.id_usuario
//   );
//   setFundos(result);
// }
// useEffect(() => {
//   getFundos();
// }, []);

return (
  <Body>
    {/* {fundos?.map((fundo) => (
      <></>
    ))} */}
  </Body>
);
}

export default Investimentos;
