import React from 'react';
import './App.css';

function DataFormatada(props){
  return <h2>Horário Atual: {props.date.toLocaleTimeString()}</h2>
}



//classe clock herda os componentes do react e será chamada na renderizção do app
class Clock extends React.Component{
  //criado um construtor para usar propriedades
  constructor(props){
    //super traz mais funcionalidades para o construtor
    super(props);
    
    //armazena valor de propriedades que pertencem ao componente, parecido com variaveis
    this.state = {
      //nome do estado : valor inicial
      date : new Date()
    }
  }

  //ciclo de vida que ocorre quando clock é inserido na DOM
  componentDidMount(){
    //código que vai ser renderizado quando o componente for chamado (ao iniciar ou entrar em uma página)

    //através da set interval, o relógio é criado (com um timer id ligado a ele)
    // e chama a função thick a cada um segundo 
    this.timerID = setInterval( () => {
      this.thick()
    }, 1000)
    
  }

  //ciclo de vida que ocorre quando o componente é removido da DOM
  //função clearInterval limpa o relógio criado pelo setInterval
  componentWillUnmount(){
    //código que vai acontecer quando um componente for removido

    clearInterval(this.timerID);
  }

  //define no state date a data atual a cada vez que é chamada
  thick(){
    this.setState({
      date : new Date()
    })
  }

  pause(){
    clearInterval(this.timerID)

    console.log("Relógio " + this.timerID + " pausado!")
  }

  play(){
      this.componentDidMount()
    
      console.log("Relógio retomado!")
      console.log("Agora eu sou o relógio " + this.timerID)
  }

  //renderiza na tela o titulo
  render(){
    return (
      <div>
        <h1>Relogio</h1>
        <DataFormatada date = {this.state.date} />
        <button onClick = {() => this.pause()} style={{color: "white", fontWeight:"600", height: "25px", marginRight: "10px", backgroundColor: "red", border: 0}}>Pausar</button>
        <button onClick = {() => this.play()} style={{color: "white", fontWeight:"600", height: "25px", marginRight: "10px", backgroundColor: "green", border: 0}} >retomar</button>
      </div> 
    )
    
  }
}

//função principal, chamada no index.js
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Clock/>
       <Clock/>
      </header>
    </div>
  );
}

//declara que a função app pode ser usada fora do escopo dela mesma
export default App;
