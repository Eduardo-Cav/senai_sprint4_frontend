import React from 'react';
import logo from "../../assets/img/logo.png"
import Rodape from '../../components/Rodape/rodape';
import Titulo from '../../components/Titulo/titulo';

class TiposEventos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //nomeEstado : valorInicial
            listaTiposEventos : [],
            titulo : '',
            idTEAlterado: 0,
            titulosecao : 'Lista Tipos Eventos'
        }
    }

    //() = invocação de função, funciona basicamente como o bind
    
    buscarTiposEventos = () => {
        
        //faz a chamada para api usando o fetch
        fetch('http://localhost:5000/api/tiposeventos',{
            headers : {
              'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        //define o tipo de dado do retorno da requisição (JSON)
        .then(resposta => resposta.json())

        //pega os dados obtidos da api e atribui ao state listaTiposEventos
        .then(dados => this.setState({listaTiposEventos : dados}))

        //se houver algum erro, é mostrado no console do navegador
        .catch(erro => console.log(erro))
    }
    
    //atualiza o state titulo com valor do input
    atualizaState = async (event) => {
        //         nomeEstado : Valor do input
        await this.setState({titulo : event.target.value })
    }

    //cadastra um tipo de evento
    cadastrarTipoEvento = (event) => {
        //ignora o comportamento padrão do navegador
        event.preventDefault();

        //se um evento for selecionado para edição
        if (this.state.idTEAlterado !== 0) {
            
            //chama a api usando fetch passando o id do tipo de evento que será atualizado, na url da requisição
            fetch('http://localhost:5000/api/tiposeventos/' + this.state.idTEAlterado,
            {
                method: "PUT",

                body: JSON.stringify({tituloTipoEvento : this.state.titulo}),

                headers : {
                    "Content-Type" : "application/json",
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })

            .then(resposta => {
                //se a requisição retornar um status code 204
                if (resposta.status === 204) {
                    //exibe no console do navegador
                    console.log("Tipo de evento " + this.state.idTEAlterado + " Atualiado,",
                    "Seu novo titulo agora é: " + this.state.titulo)
                }
            })

            .then(this.buscarTiposEventos)

            //após fazer um cadastro, limpa os campos novamente
            .then(this.LimparCampos)

        } else {

           //Cadastro

            fetch('http://localhost:5000/api/tiposeventos', 
            {
                //define o metódo da requisição
                method: "POST",

                //define o corpo da requisição especificando o tipo (JSON)
                //converte o state para uma string json
                body : JSON.stringify({tituloTipoEvento : this.state.titulo}),
                
                //Define o cabeçalho da requisição
                headers : {
                    "Content-Type" : "application/json",
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`                }
            })

            .then(console.log('tipo evento cadastrado'))

            .catch(erro => console.log(erro))

            //atualiza a lista de tipos de evento, sem o usuario precisar executar uma ação
            .then(this.buscarTiposEventos)

            //após fazer um cadastro, limpa os campos novamente
            .then(this.LimparCampos)
            }
    }  

     //chama a função buscarTiposEventos() assim que o componente for renderizado
    componentDidMount(){
        this.buscarTiposEventos();
    }

    buscarTEid = (tipoEvento) => {
        this.setState({
            idTEAlterado : tipoEvento.idTipoEvento, 
            titulo : tipoEvento.tituloTipoEvento
        })
    }


    componentWillUnmount(){
       
    }

    //exclui um tipo de evento
    excluirTEid = (tipoEvento) => {

        console.log("O tipo de evento " + tipoEvento.idTipoEvento + " foi selecionado")

        //chama a api e passa o id do tipo de evento que será excluido, pela url na requisição
        fetch('http://localhost:5000/api/tiposeventos/' + tipoEvento.idTipoEvento,
        {
            
            method : "DELETE",
            
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
              }
        })

        .then(resposta => {
            if (resposta.status === 204){
                    console.log("Tipo de evento " + tipoEvento.idTipoEvento + " foi excluido!")
                }
            
        })

        .then(this.buscarTiposEventos)

        .then(this.LimparCampos)

        .catch(erro => console.log(erro))
    }

    //reseta os states titulo e idTEAlterado, para que o campo cadastrar apareça
    //quando for clicado o botão Cancelar
    LimparCampos = () => {
        this.setState({
            titulo : '',
            idTEAlterado : 0
        })
    }

    render(){
        return(
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src={logo} alt="Logo da Gufi" />

                        <nav className="cabecalhoPrincipal-nav">
                        Administrador
                        </nav>
                    </div>
                </header>
                <main 
                className="conteudoPrincipal">
                    <section 
                    className="conteudoPrincipal-cadastro">
                        {/* lista os tipos de eventos */}
                        <Titulo titulosecao = {this.state.titulosecao} />
                        {/* <h2 
                        className="conteudoPrincipal-cadastro-titulo">Lista de tipos de eventos</h2> */}
                        <div 
                        className="container" id="conteudoPrincipal-lista">
                        <table id="tabela-lista">
                            {/* cabeçalho da table */}
                            <thead>
                                {/* linha do cabeçalho */}
                                <tr>
                                    {/* coluna de cada linha */}
                                    <th>#</th>
                                    <th>Título</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            {/* corpo da tabela */}
                            <tbody 
                            id="tabela-lista-corpo">
                               {
                                   this.state.listaTiposEventos.map( (tipoEvento) => {
                                       return(
                                           <tr key= {tipoEvento.idTipoEvento}>
                                               <td>{tipoEvento.idTipoEvento}</td>
                                               <td>{tipoEvento.tituloTipoEvento}</td>

                                               {/* chama a função buscarTEid passando o evento selecionado */}
                                               <td>
                                                   <button  onClick = {() => this.buscarTEid(tipoEvento)}>Editar</button>
                                                   
                                                

                                                 {/* chama a função excluitTEid passando o evento selecionado */}
                                              
                                                   
                                                    <button onClick = {() => this.excluirTEid(tipoEvento)}>Excluir</button>
                                                </td>
                                           </tr>
                                       )
                                   })
                               }
                            </tbody>
                        </table>
                        </div>
                    </section>
                    <section 
                    className="container" id="conteudoPrincipal-cadastro">
                        {/* Cadastro de tipo de evento */}
                        <Titulo titulosecao = "Cadastro de tipo de evento" />
                        {/* <h2
                        className="conteudoPrincipal-cadastro-titulo">Cadastro de tipo de evento</h2> */}
                        
                        {/* Formulario de cadastro de tipo de evento */}
                        <form onSubmit={this.cadastrarTipoEvento}>
                            <div className="container">
                                <input
                                    id="nome-tipo-evento"
                                    type="text"
                                    value={this.state.titulo}
                                    onChange={this.atualizaState}
                                    placeholder="Titulo do Tipo de evento"
                                />
                                {/* <button type="submit">Cadastrar</button> */}

                                {/* Altera o botão de acordo com o que for solicitado (edição ou cadastro), com if ternario */}
                                
                                {/* Estrutura IF ternário */}
                                {/* condição ? faço algo, caso a condição for atendida : caso seja falso, é realizada outra ação */}
                                {/* ? = se for verdadeiro
                                    : = se for falso */}

                                {/* {
                                    this.state.idTEAlterado === 0 ? 
                                    <button type ="submit">Cadastrar</button> :
                                    <button type ="submit">Atualizar</button>
                                } */}

                                {/* Outra forma, com IF ternário e disabled ao mesmo tempo */}

                                {
                                    <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" type="submit" disabled={this.state.titulo === '' ? 'true' : ''}>
                                        {
                                            this.state.idTEAlterado === 0 ? "Cadastrar" : "Atualizar"
                                        }
                                    </button>
                                }

                                <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" type = "button" onClick ={this.LimparCampos}>
                                    Cancelar
                                </button>
                                
                            </div>
                        </form>
                                
                        {/* Caso algum Tipo de Evento tenha sido selecionado para edição, exibe a mensagem
                        de feedback ao usuário 
                        
                        && = usado apenas quando quero que uma condição seja verdadeira
                        */}

    
                        {
                            this.state.idTEAlterado !== 0 &&
                            <div>
                                <p>O tipo de evento {this.state.idTEAlterado} está sendo editado</p>
                                <p>Clique em "Cancelar" caso queira cancelar a operação antes de cadastrar um novo tipo de evento</p>
                            </div>
                        }
                    </section>
                </main>
                <Rodape />
            </div>
        )
    }
}

export default TiposEventos;