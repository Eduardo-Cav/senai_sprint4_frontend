
import React, {Component} from 'react';
import api from '../../services/api';

class ConsultasM extends Component{
    constructor(props){
        super(props);
        this.state ={
            consultas : []
        }
    }
    
    buscarConsultasM = async () => {

        await api.get(`/consultas/minhas`, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })


        .then(resposta => 
            this.setState({consultas : resposta.data})
        )

        .catch(erro => console.log(erro))
    }

    atualizaUser = async (event) =>{
        await this.setState({
            idUsuarioMedico : event.target.value

        })
        console.log(this.state.idUsuario)
    }
    
    componentDidMount(){
        this.buscarConsultasM();
    }

    render(){
        return(
            <div>
                <main>
                    <section>
                        <h2>Consultas Medico</h2>
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
                                    this.state.consultas.map( consulta => {
                                        return(
                                            <tr key={consulta.idConsulta}>

                                                <td>{consulta.idConsulta}</td>
                                                <td>{consulta.dataAgendamento}</td>
                                                <td>{consulta.descricao}</td>
                                                <td>{consulta.idPacienteNavigation.nomeMedico}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                    <section> 
                    <form onSubmit={this.buscarConsultasM}>
                        <div>
                            <input 
                                type="text"
                                value={this.state.idUsuarioMedico}
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

export default ConsultasM;