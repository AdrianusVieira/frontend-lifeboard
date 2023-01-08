import React from "react";
import {
  AuxiliarText,
  Base,
  Body,
  Box,
  InitialTitle,
  PhotoSection,
} from "./Styles";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
function Home() {
  return (
    <Body>
      <Base>
        <Box>
          <PhotoSection>
            <UserOutlined />
          </PhotoSection>
        </Box>
      </Base>
    </Body>
  );
}

export default Home;
