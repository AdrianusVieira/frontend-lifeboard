import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cadastro from "./pages/Cadastro"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Financeiro from "./pages/Financeiro";
import Tarefas from "./pages/Tarefas";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastro" component={Cadastro} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/financeiro" component={Financeiro} />
        <Route exact path="/tarefas" component={Tarefas} />
        <Route component={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
