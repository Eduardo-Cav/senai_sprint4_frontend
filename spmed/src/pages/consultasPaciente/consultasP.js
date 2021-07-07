import React, {Component} from 'react';

import api from '../../services/api';

class Consultas extends Component{
    constructor(props){
        super(props);
        this.state ={
            consulta : []
        }
    }

    buscarConsultasP = async (event) => {

        await api.get(`/consultas/minhas`, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })


        .then(resposta => 
            this.setState({consulta : resposta.data})
        )

        .catch(erro => console.log(erro))

        
    }

    componentDidMount(){
        this.buscarConsultasP();
    }

    atualizaUser = async (event) =>{
        await this.setState({
            idUsuario : event.target.value

        })
        console.log(this.state.idUsuario)
    }
    

    render(){
        return(
            <div>
                <main>
                    <section>
                        <h2>Consultas Paciente</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>data</th>
                                    <th>descricao</th>
                                    <th>medico</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Preenche o corpo da tabela com a funçaõ map */}

                                {
                                    this.state.consulta.map( consulta => {
                                        return(
                                            <tr key={consulta.idConsulta}>

                                                <td>{consulta.idConsulta}</td>
                                                <td>{consulta.dataAgendamento}</td>
                                                <td>{consulta.descricao}</td>
                                                <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                    <section> 
                    <form onSubmit={this.buscarConsultasP}>
                        <div>
                            <input 
                                type="text"
                                value={this.state.idUsuario}
                                //atualiza o que o usuário escreve para depois ser chamada a função 
                                onChange={this.atualizaUser}
                                placeholder="usuario que irá buscar"
                            />

                            <button type="submit">Procurar</button>
                        </div>
                    </form>
                </section> 
                </main>
            </div>
        )
    }
}

export default Consultas;