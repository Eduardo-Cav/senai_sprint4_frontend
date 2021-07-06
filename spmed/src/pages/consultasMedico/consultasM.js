import axios from 'axios';
import React, {Component} from 'react';

class Eventos extends Component{
    constructor(props){
        super(props);
        this.state ={
            titulo : '',
            nomePaciente : '',
            descricao : '',
            situacao : 1,
            data : new Date()
        }
    }
}
