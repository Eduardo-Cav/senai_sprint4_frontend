import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import Consultas from './pages/consultasPaciente/consultasP';
import ConsultasM from './pages/consultasMedico/consultasM';
import Login from './pages/login/login'
import NotFound from './pages/notFound/notFound';
import App from './pages/home/App'

const PermissaoMed = ({component : Component}) => (
  <Route 
    render ={ props =>
      usuarioAutenticado() && parseJwt().role === "2" ?
      <Component {...props} /> :
      <Redirect to = 'login' />
    }
  />
)

const PermissaoPac = ({component : Component}) => (
  <Route 
    render ={ props =>
      usuarioAutenticado() && parseJwt().role === "3" ?
      <Component {...props} /> :
      <Redirect to = "login" />
    }
  />
)

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path = "/" component ={App}/>
        <Route path = "/login" component ={Login}/>
        <PermissaoPac path = "/consultasp" component = {Consultas}/>
        <PermissaoMed path = "/consultasm" component = {ConsultasM}/>
        <Route path = "/notfound" component = {NotFound}/>
        //redireciona para notfound, caso nenhuma outra seja encontrada
        <Redirect to = "/notfound"/>
      </Switch>
    </div>
  </Router>

)


ReactDOM.render(routing, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
