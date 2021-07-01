import React, {Component} from 'react';
import axios from 'axios'

class Eventos extends Component{
    constructor(props){
        super(props);
        this.state = {
            titulo : '',
            descricao : '',
            data : new Date(),
            acesso : 0,
            idTipoEvento : 0,
            idInstituicao : 0,
            listaTiposEventos : [],
            listaInstituicoes : [],
            listaEventos : [],
            isLoading : false
        }
    }

    //faz a requisição e traz a lista de tipos de eventos
    buscarTiposEventos = () =>{
        //chama a api usando o axios
        axios('http://localhost:5000/api/tiposeventos', {

            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(resposta => {
            //se a requisição retornar 200
            if(resposta.status === 200){
                this.setState({
                    //atualiza o state com os dados da api
                    listaTiposEventos : resposta.data
                })
                console.log(this.state.listaTiposEventos)
            }
        })

        .catch(erro => console.log(erro))
    }

    //faz a requisição e traz a lista de instituições
    buscarInstituicoes = () => {
        //chama a api usando o axios
        axios('http://localhost:5000/api/instituicoes', {

            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(resposta => {
            //se a requisição retornar 200
            if(resposta.status === 200){
                this.setState({
                    //atualiza o state com os dados da api
                    listaInstituicoes : resposta.data
                })
                console.log(this.state.listaInstituicoes)
            }
        })

        .catch(erro => console.log(erro))
    }

    //faz a requisição e traz a lista de eventos
    buscarEventos = () => {
        //chama a api usando o axios
        axios('http://localhost:5000/api/eventos', {

            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(resposta => {
            //se a requisição retornar 200
            if(resposta.status === 200){
                this.setState({
                    //atualiza o state com os dados da api
                    listaEventos : resposta.data
                })
                console.log(this.state.listaEventos)
            }
        })

        .catch(erro => console.log(erro))
    }

    //atualiza o state cada vez que há uma alteração no input
     atualizaState = async (campo) =>{
        await this.setState({ [campo.target.name] : campo.target.value})

    }

    componentDidMount(){
        this.buscarTiposEventos();
        this.buscarInstituicoes();
        this.buscarEventos();
    }

    //chama a api com o método de cadastrar evento
    cadastrarEvento = (event) =>{
        //ignora o comportamento padrão do navegador
        event.preventDefault()

        this.setState({isLoading : true})

        //evento que recebe os dados do state
        //converte acesso para int, para que no back-end seja possivel cadastrar
        //pois o navegador envia o dado como string, e não da pra converter para bool implicitamente
        let evento ={
            //vem da api //state
            nomeEvento : this.state.titulo,
            descricao : this.state.descricao,
            dataEvento : new Date(this.state.data),
            acessoLivre : parseInt(this.state.acesso),
            idTipoEvento : this.state.idTipoEvento,
            idInstituicao : this.state.idInstituicao
        }

        //define a url e o corpo da requisição
        axios.post('http://localhost:5000/api/eventos', evento, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })

        //verifica o retorno da requisição

        .then(resposta => {
            //caso retorne 201
            if (resposta.status === 201) {
                
                //exibe no console do navegador a mensagem abaixo
                console.log('Evento cadastrado!')
                //define que a requisição terminou
                this.setState({isLoading : false})
            }
        })

        //se houver algum erro, é mostrado no console
        .catch(erro => {
            console.log(erro)
            
            //define que a requisição terminou
            this.setState({isLoading : false})
        })

        //atualiza a lista de eventos, sem o usuario precisar executar uma ação
        .then(this.buscarEventos)
    }

    render(){
        return(
            <div>
                <main>
                    <section>
                        <h2>Lista Eventos</h2>
                        <table style={{borderCollapse : 'separate', borderSpacing : 30 }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Evento</th>
                                    <th>Descrição</th>
                                    <th>Data</th>
                                    <th>Acesso</th>
                                    <th>Tipo de Evento</th>
                                    <th>Localização</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Preenche o corpo da tabela com a funçaõ map */}

                                {
                                    this.state.listaEventos.map( evento => {
                                        return(
                                            <tr key={evento.idEvento}>

                                                <td>{evento.idEvento}</td>
                                                <td>{evento.nomeEvento}</td>
                                                <td>{evento.descricao}</td>
                                                <td>{evento.dataEvento}</td>
                                                <td>{evento.acessoLivre ? 'Livre' : 'Restrito'}</td>
                                                <td>{evento.idTipoEventoNavigation.tituloTipoEvento}</td>
                                                <td>{evento.idInstituicaoNavigation.nomeFantasia}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h2>Cadastro de Eventos</h2>
                        <form onSubmit={this.cadastrarEvento}>
                            <div style={{display : 'flex', flexDirection : 'column', width : '20vw'}}>
                                <input 
                                    type="text"
                                    name="titulo"

                                    //define que o valor do input é o valor do state
                                    value={this.state.titulo}

                                    //chama a função para atualizar o state cada vez que há uma alteração no input
                                    onChange={this.atualizaState}
                                    placeholder="Título do evento"
                                />

                                <input 
                                    required
                                    type="text"
                                    name="descricao"

                                    //define que o valor do input é o valor do state
                                    value={this.state.descricao}

                                    //chama a função para atualizar o state cada vez que há uma alteração no input
                                    onChange={this.atualizaState}
                                    placeholder="descrição do evento"
                                />

                                <input 
                                    type="date"
                                    name="data"

                                    //define que o valor do input é o valor do state
                                    value={this.state.data}

                                    //chama a função para atualizar o state cada vez que há uma alteração no input
                                    onChange={this.atualizaState}
                                    placeholder="data do evento"
                                />

                                <select
                                    //acesso livre
                                    name="acesso"
                                    value={this.state.acesso}

                                    //chama a função para atualizar o state cada vez que há uma alteração no input
                                    onChange={this.atualizaState}
                                >
                                    <option value="1">Livre</option>
                                    <option vakue="0">Restrito</option>
                                </select>

                                <select
                                    //acesso livre
                                    name="idTipoEvento"
                                    value={this.state.idTipoEvento}

                                    //chama a função para atualizar o state cada vez que há uma alteração no input
                                    onChange={this.atualizaState}
                                >
                                    <option vakue="0">Selecione o tema do evento</option>

                                    {/* utiliza a função map para preencher a lista de option */}

                                    {
                                        //percorre a lista de tipos eventos e retorna uma option para cada tema
                                        //definindo o valor como seu próprio id

                                        this.state.listaTiposEventos.map(tema => {
                                            return(
                                                <option key={tema.idTipoEvento} value={tema.idTipoEvento}>
                                                {tema.tituloTipoEvento}
                                                </option>
                                            )
                                        })
                                    }
                                </select>

                                <select
                                    //acesso livre
                                    name="idInstituicao"
                                    value={this.state.idInstituicao}

                                    //chama a função para atualizar o state cada vez que há uma alteração no input
                                    onChange={this.atualizaState}
                                >
                                    <option vakue="0">Selecione a localização</option>

                                    {/* utiliza a função map para preencher a lista de option */}

                                    {
                                        //percorre a lista de locais e retorna uma option para cada lugar
                                        //definindo o valor como seu próprio id

                                        this.state.listaInstituicoes.map(local => {
                                            return(
                                                <option key={local.idInstituicao} value={local.idInstituicao}>
                                                {local.nomeFantasia} - {local.endereco}
                                                </option>
                                            )
                                        })
                                    }
                                </select>

                                {/* verifica se alguma requisição está em andamento, através do state
                                isLoding */}

                                {
                                    //se for true, renderiza o botão desabilitado com o texto "Loading..."
                                    this.state.isLoading == true &&
                                    <button type="submit" disabled>
                                        Loading...
                                    </button>
                                    
                                }

                                {
                                    //se for true, renderiza o botão habilitado com o texto "Cadastrar"
                                    this.state.isLoading == false &&
                                    <button type="submit">
                                        Cadastrar
                                    </button>
                                    
                                }
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        )
    }

}

export default Eventos;
