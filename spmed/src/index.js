import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'

import Consultas from './pages/consultasPaciente/consultasP';
import ConsultasM from './pages/consultasMedico/consultasM';
import Login from './pages/login/login'

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path = "/" component ={Login}/>
        <Route path = "/consultasp" component = {Consultas}/>
        <Route path = "/consultasm" component = {ConsultasM}/>
      </Switch>
    </div>
  </Router>

)


ReactDOM.render(routing, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
