import React, {Component} from 'react';
import axios from 'axios'
import {parseJwt, usuarioAutenticado} from '../../services/auth'

import '../../assets/css/login.css'

import logo from '../../assets/img/logo.png'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : '',
            erroMensagem : '',
            isLoading : false
        }
    }

    // faz a chamada para api, com o método de login
    efetuaLogin = (event) => {
        //ignora o comportamento padrão do navegador de atualizar a página
        event.preventDefault();

        //remove a frase de erro de login, e define que a requisição está em andamento
        this.setState({ erroMensagem : '', isLoading : true})

        //define a url e os parâmetros da requisição
        axios.post('http://localhost:5000/api/login', {
            email : this.state.email,
            senha : this.state.senha
        })

        //verifica o retorno da requisição
        .then(resposta => {
            //se o status code for 200
            if (resposta.status === 200) {
                //salva o token no localStorage
                //data = chave que fica dentro da resposta, onde possui um objeto com o token dentro
                localStorage.setItem('token', resposta.data.token)

                //exiber o valor no console
                // console.log("meu token é: " + resposta.data.token)

                //define que a requisição terminou
                this.setState({ isLoading : false})

                // //define a variavel base64 que vai receber o payload
                // let base64 = localStorage.getItem('token').split('.')[1]
                // console.log(base64)
                // //exibe no console o valor decodificado de base64 para string
                // console.log(window.atob(base64))

                // //exibe no console o valor convertido de string para json
                // console.log(JSON.parse(window.atob(base64)))

                // //exibe no console o valor do tipo de usuário convertido de string para json
                // console.log(JSON.parse(window.atob(base64)))
                
                //exibe no console os dados do token convertido para objeto
                // console.log(parseJwt())


                //verifica o tipo do usuario, se for adm manda pra pagina de tipos eventos,
                //se for comum manda pra home

                if (parseJwt().role === "1") {
                    //manda para a página de tipos eventos

                    this.props.history.push('/tiposeventos')
                }else{
                    //manda para pagina home
                    this.props.history.push('/')
                }
            }
        })

        .catch(() =>{
            this.setState({
                erroMensagem : "Email ou senha inválidos! Tente novamente!",
                isLoading : false
            })
        })
    }

    //atualizao state de acordo com o input
    atualizaState = async (campo) =>{
        await this.setState({ [campo.target.name] : campo.target.value})

    }


    render(){
        return(
            <div>
                <main>
                    <section className="container-login flex">
                    <div className="img__login"><div className="img__overlay"></div></div>
                    <div className="item__login">
                        <div className="row">
                            <div className="item">
                                <img src={logo} className="icone__login" alt="logo da Gufi" />
                            </div>
                            <div className="item" id="item__title">
                        
                                <p className="text__login" id="item__description">Bem vindo(a)! <br/> Faça Login para acessar sua conta</p>
                            </div>   
                                {/* Faz a chamada para função de login quando o usuário clica no botão */}
                            <form className="item" onSubmit={this.efetuaLogin}>
                                <div className="item">
                                    <input 
                                    //email
                                    id="login__email"
                                    className="input__login"
                                    type="text"
                                    name="email"

                                    //Define o valor do input, que recebe o valor do state
                                    value={this.state.email}
                                    //chama a função que atualiza o state, conforme a digitação do usuário
                                    onChange={this.atualizaState}
                                    placeholder="email"
                                    />
                                </div>

                                <div className="item">
                                    <input 
                                    //senha
                                    className="input__login"
                                    id="login__password"
                                    type="password"
                                    name="senha"

                                    //Define o valor do input, que recebe o valor do state
                                    value={this.state.senha}
                                    //chama a função que atualiza o state, conforme a digitação do usuário
                                    onChange={this.atualizaState}
                                    placeholder="password"
                                    />
                                </div>
                                    {/* Mensagem de erro ao logar com credenciais erradas */}

                                    <p style={{color : "red"}}>{this.state.erroMensagem}</p>

                                    {/* veirifica se a requisição está em andamento
                                        se estiver, desabilita o clique do botão */}
                                
                                
                                    {
                                        //se a requisição estiver em andamento, o botão fica desabilitado com o texto Loading...
                                        this.state.isLoading === true &&
                                        <div className="item">
                                            <button 
                                            className="btn btn__login" id="btn__login"
                                            type="submit" disabled>Loading...</button>
                                        </div>
                                    }


                                    {
                                        //caso isLoading seja false, se o campo de email ou senha estiverem vazios, desabilita o botão de login
                                        this.state.isLoading === false &&
                                        <div className="item">
                                            <button
                                            className="btn btn__login" id="btn__login"
                                            type="submit"
                                            disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}
                                            >
                                                Login
                                            </button>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default Login;