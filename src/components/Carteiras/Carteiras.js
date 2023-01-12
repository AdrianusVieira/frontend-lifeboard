import React, { useState, useEffect } from "react";
import { Body } from "./Styles";
import * as managerService from "../../services/managerService";

function Carteiras(props) {
  const [carteiras, setCarteiras] = useState();

  async function getCarteiras() {
    const result = await managerService.getCarteirasByUsuario(
      props.usuario.id_usuario
    );
    setCarteiras(result);
  }
  useEffect(() => {
    getCarteiras();
  }, []);

  return (
    <Body>
      {carteiras?.map((carteira) => (
        <></>
      ))}
    </Body>
  );
}

export default Carteiras;
