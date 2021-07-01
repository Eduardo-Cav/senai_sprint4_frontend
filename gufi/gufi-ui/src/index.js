import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import {parseJwt, usuarioAutenticado} from './services/auth'

import './index.css';

import App from './pages/home/App';
import NotFound from './pages/notFound/notFound'
import TiposEventos from './pages/tiposEventos/tiposEventos'
import Login from './pages/login/login';
import Eventos from './pages/eventos/eventos'

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({component : Component}) =>(
  <Route 
    render = {props =>
      //verifica se o usuario esta logado e se é admin
      usuarioAutenticado() && parseJwt().role === "1" ?
      //se sim, rendereiza de acordo com a rota solicitada e permitida
      <Component {...props} /> :
      //se não, redireciona para página home
      <Redirect to = '/' />
    }
  />
)

// const PermissaoComum = ({component : Component}) =>(
//   <Route 
//     render = {props =>
//       //verifica se o usuario esta logado e se é comum
//       usuarioAutenticado() && parseJwt().role === "2" ?
//       //se sim, rendereiza de acordo com a rota solicitada e permitida
//       <Component {...props} /> :
//       //se não, redireciona para página login
//       <Redirect to = '/login' />
//     }
//   />

// )
const routing = (
  <Router>
    <div>
      <Switch>
        {/* caminho da rota */}
        <Route exact path = "/" component = {App}/>  {/*home*/}
        <PermissaoAdm path = "/tiposeventos" component = {TiposEventos}/>  {/*tipos eventos*/}  
        <Route path = "/notfound" component = {NotFound}/>  {/*Not Foubd*/}  
        <Route path = "/eventos" component = {Eventos}/>  {/*eventos*/}  
        <Route path = "/login" component = {Login}/>  {/*login*/}  
        <Redirect to = "/notfound"/>  {/*redireciona para notfound se não encontrar nenhuma rota*/}  
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
