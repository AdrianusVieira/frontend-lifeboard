import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
    }

  html,
  body,
  div#root {
    height: 100%;
    width: 100%;
    background: #1E1E1E;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  }
  `;

export default GlobalStyle;
