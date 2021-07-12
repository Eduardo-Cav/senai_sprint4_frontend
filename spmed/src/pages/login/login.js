import {parseJwt} from '../../services/auth';
import React, {Component} from 'react';
import api from '../../services/api';

import logo from '../../assets/img/logo_spmedgroup_v2.png'

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
                <main >
                    <section style={{display:'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
                        <form onSubmit={this.login} style={{display: 'flex', margin: 0, alignItems: 'center', flexDirection: 'column'}}>
                        <img src={logo} style={{width: 100, height:100, marginBottom: '2em'}}/>
                            <input
                                type='text' 
                                name='email'
                                value={this.state.email}
                                onChange={this.atualizaState}
                                placeholder = 'email'
                                style={{marginBottom: 30, border: 0, borderBottomWidth: 1, borderBottomColor:'#75dddd', width: 280, height: 30, borderStyle: 'solid'}}

                            />

                            <input
                                type='password' 
                                name='senha'
                                value={this.state.senha}
                                onChange={this.atualizaState}
                                placeholder = 'senha'
                                style={{marginBottom: 30, border: 0,  width: 280, height: 30, borderBottomWidth: 1, borderBottomColor: '#75dddd', borderStyle: 'solid'}}
                            />

                            <button type="submit" style={{border: 0, width: 100, height: 25, backgroundColor: '#086788', borderRadius: 2, color: 'white', fontWeight:'bold'}}>Login</button>
                        </form>
                    </section>
                </main>
            </div>

        )
    }
}

export default Login;