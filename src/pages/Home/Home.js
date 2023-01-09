import React, { useState, useEffect } from "react";
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
} from "./Styles";
import { UserOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { getEmail } from "../../services/auth";
import * as managerService from "../../services/managerService";

function Home() {
  const [usuario, setUsuario] = useState({});
  const [total_exp, setTotal_exp] = useState("");
  const [percent, setPercent] = useState(0);

  async function getUsuario() {
    const email = getEmail();
    const result = await managerService.getUsuarioByEmail(email);
    setUsuario(result);
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

  function calculatingBarPercent() {
    const aux = (usuario.exp_atual * 100) / total_exp;
    setPercent(aux);
  }
  useEffect(() => {
    calculatingBarPercent();
  }, [total_exp]);

  return (
    <Body>
      <Base>
        <Box>
          <PhotoSection>
            <UserOutlined />
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
        </Box>
      </Base>
    </Body>
  );
}

export default Home;
