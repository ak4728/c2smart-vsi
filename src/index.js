import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";

import Login from './login/Login';
import MainMenu from './home/home';
// import "./home.css";
import {
  Button,
  Icon,
  Collapse,
} from "antd";

// const Panel = Collapse.Panel;

class IndexFile extends React.Component {
  constructor(props) {
    super(props);}
}

ReactDOM.render(
  <div>
    <Login />
  </div>,
  document.getElementById("container")
);

const routing = (
    <Router>
      <div>
        <Route exact path = "/" component = {Login}/>
        <Route path = "/home" component = {MainMenu}/>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('container'))