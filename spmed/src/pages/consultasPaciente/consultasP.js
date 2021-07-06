import React, {Component} from 'react';

import api from '../../services/api';

class Consultas extends Component{
    constructor(props){
        super(props);
        this.state ={
            consulta : []
        }
    }

    buscarConsultasP = async () => {

        const resposta = await api.get(`/consultas/minhas`)

        .then(resposta => {
            
            if (resposta.status === 200) {
                this.setState({
                    consulta : resposta.data    
                })

                console.log(this.state.consulta)
            }
        })

        .catch(erro => console.log(erro))
    }

    componentDidMount(){
        this.buscarConsultasP();
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
                                    <th>descrição</th>
                                    <th>data</th>
                                    <th>medico</th>
                                    <th>paciente</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Preenche o corpo da tabela com a funçaõ map */}

                                {
                                    this.state.consulta.map( consulta => {
                                        return(
                                            <tr key={consulta.idEvento}>

                                                <td>{consulta.idConsulta}</td>
                                                <td>{consulta.dataAgendamento}</td>
                                                <td>{consulta.idMedicoNavigation}</td>
                                                <td>{consulta.idPacienteNavigation}</td>
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
                                value={this.state.nomeUsuario}
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