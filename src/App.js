import React from "react";
import GlobalStyle from "./globalStyles";
import Routes from "./routes";
import styled from "styled-components";
import "antd/dist/antd.css";

const Body = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Body>
      <GlobalStyle />
      <Routes />
    </Body>
  );
}
export default App;
