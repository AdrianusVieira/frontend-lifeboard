import React, { useState, useEffect } from "react";
import { Body } from "./Styles";
import * as managerService from "../../services/managerService";

function Fundos(props) {
 const [fundos, setFundos] = useState();

 async function getFundos() {
   const result = await managerService.getFundosByUsuario(
     props.usuario.id_usuario
   );
   setFundos(result);
 }
 useEffect(() => {
   getFundos();
 }, []);

 return (
   <Body>
     {fundos?.map((fundo) => (
       <></>
     ))}
   </Body>
 );
}

export default Fundos;
