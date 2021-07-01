//Objetos
var pcGamer = new Object();
pcGamer.gpu = "RTX 3090"
pcGamer.modelo = "Nvidia"
pcGamer.ano = "2020"



// testes com this
this.a = 37
console.log(window.a)

//1,2,3,4,5,6
console.log([1,2,3] + [,4,5,6])
//1,2,34,5,6
console.log([1,2,3] + [4,5,6])

//Arrow functions, maneiras de fazer uma função mais rápid
//this não varia
//Exemplos:

//normal
let dobro = function (a){
    return 2*a
}

//com return explicito
dobro = (a) =>{
    return 2 * a
}

//return implicito
dobro = a => 2 * a // return está implicito na declaração

//sem parametro
ola = () => "Olá"

//apenas um parametro, que pode ser ignorado
ola = _ => "Olá"
//_ não é ausencia de parametro, é um parametro ignorável

//Classes

class Retangulo{
    constructor(altura, largura){
        this.altura = altura;
        this.largura = largura;
    }  
}

//subclasses
//criada uma classe animal e definido que quando ela for chamada, todo animal possuirá um nome terá a habilidade de falar
class Animal{
    constructor(nome){
        this.nome = nome
    }

    falar() {
        console.log(this.nome + "emite um barulho")
    }
}

class Cachorro extends Animal {
    //pega o método da classe animal, como em uma sobreescrita
    falar(){
        console.log(this.nome + " solta latidos")
    }
}

let cachorro = new Cachorro("Zeus")
cachorro.falar();

//Template strings
//Template Strings são strings que permitem expressões embutidas. Você pode utilizar string multi-linhas e interpolação de string com elas.

const str1 = "teste" //declarando string normal
const strMultiLinha = "linha1 \n linha2" // declara string cm várias linhas

console.log(str1)
console.log(strMultiLinha)

//string multilinha com template string e sem \n
const strMultiLinha = `linha1
linha meio
linha2`
console.log(strMultiLinha)

//também é pssivel criar uma string interpolada
const a = 10
const str = `Ola ${a + 1} !`
console.log(str)