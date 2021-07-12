
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
                        <h2 style={{textAlign:'center'}}>Consultas Medico</h2>
                        <table style={{ borderCollapse : 'separate', borderSpacing : 30, margin: 'auto'}}>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                    <th>Paciente</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Preenche o corpo da tabela com a funçaõ map */}

                                {
                                    this.state.consultas.map( consulta => {
                                        return(
                                            <tr key={consulta.idConsulta}>
                                                <td>{consulta.dataAgendamento}</td>
                                                <td>{consulta.descricao}</td>
                                                <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                                <td>{consulta.idSituacaoNavigation.descricao}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        )
    }
}

export default ConsultasM;