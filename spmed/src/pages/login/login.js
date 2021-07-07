import {parseJwt} from '../../services/auth';
import React, {Component} from 'react';
import api from '../../services/api';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha: ''
        }
    }

    login = async (event) => {

        event.preventDefault();

        //define a url e os parâmetros da requisição
         api.post('/login', {
            email : this.state.email,
            senha : this.state.senha
            
        })

        
        .then(resposta => {
            
            if(resposta.status === 200){
                localStorage.setItem('token', resposta.data.token)

                if (parseJwt().role === '2') {
                    this.props.history.push('/consultasm')
                }

                if(parseJwt().role === '3'){
                    this.props.history.push('/consultasp')
                }
                
            }
            console.log(this.state.email + ' ' +  this.state.senha)

    
        })

        .catch(erro => console.log(erro))
    }

    //atualizao state de acordo com o input
    atualizaState = async (campo) =>{
        await this.setState({ [campo.target.name] : campo.target.value})

    }

    render(){
        return(
            <div>
                <main>
                    <section>
                        <form onSubmit={this.login}>
                            <input
                                type='text' 
                                name='email'
                                value={this.state.email}
                                onChange={this.atualizaState}
                                placeholder = 'email'

                            />

                            <input
                                type='password' 
                                name='senha'
                                value={this.state.senha}
                                onChange={this.atualizaState}
                                placeholder = 'senha'

                            />

                            <button type="submit">Login</button>
                        </form>
                    </section>
                </main>
            </div>

        )
    }
}

export default Login;