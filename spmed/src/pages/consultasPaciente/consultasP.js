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
                        <h2 style={{textAlign:'center'}}>Suas Consultas</h2>
                        <table style={{ borderCollapse : 'separate', borderSpacing : 30, margin: 'auto'}}>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                    <th>Situação</th>
                                    <th>Paciente</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Preenche o corpo da tabela com a funçaõ map */}

                                {
                                    this.state.consulta.map( consulta => {
                                        return(
                                            <tr key={consulta.idConsulta}>
                                                <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                                <td>{consulta.dataAgendamento}</td>
                                                <td>{consulta.descricao}</td>
                                                <td>{consulta.idSituacaoNavigation.descricao}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                    <section> 
                </section> 
                </main>
            </div>
        )
    }
}

export default Consultas;