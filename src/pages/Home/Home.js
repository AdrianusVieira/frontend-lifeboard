import React, { useState, useEffect } from "react";
import ErrorScreen from "../../components/ErrorScreen";
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
  PatrimonySection,
  PatrimonyText,
  PatrimonyCircle,
  PatrimonyCircleText,
} from "./Styles";
import { UserOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { getEmail } from "../../services/auth";
import LoadingScreen from "../../components/LoadingScreen";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/managerService";
import StartButton from "../../Styles/StartButton/StartButton";

function Home() {
  const [usuario, setUsuario] = useState({});
  const [total_exp, setTotal_exp] = useState("");
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);

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

  async function calculatingBarPercent() {
    const aux = (100 * 100) / total_exp;
    await sleep(200);
    setPercent(aux);
  }
  useEffect(() => {
    calculatingBarPercent();
  }, [total_exp]);

  return (
    <Body>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          {usuario ? (
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
                <PatrimonySection>
                  <PatrimonyText>Patrimonio Total</PatrimonyText>
                  <PatrimonyCircle>R$ 1000.00</PatrimonyCircle>
                </PatrimonySection>
              </Box>
            </Base>
          ) : (
            <ErrorScreen />
          )}
        </>
      )}
    </Body>
  );
}

export default Home;
