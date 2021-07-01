console.log("10"/2);
console.log("10"+2)

//definindo variaveis
var nome = 'eduardo' // string
var idade = 17 //int

//definindo constantes
const nota = 10 //int

//let x var

//var: é mais solto, pode ser usado livremente pelo código 
if (true) 
{
    var sair = "roupa de sair"
}

console.log(sair)

//let: só pode ser usado dentro do bloco onde foi definido
if(true)
{
    let dormir = "pijama"

    console.log(dormir)
}


let pombo = "pru"
console.log(pombo)

//operadores lógicos

x = y           //atribui y a x
var var1 = 3    //atribui 3 a var1
3 == var1       //true
"3" == var1     //true
3 == "3"        //true
3 === var1      //true
"3" === var1    //false

//operadores unários

+ 3              //retorna 3
+ '3'           //retorna 3
+ 'eduardo'     //retorna NaN
'edu' + 'ardo'  //retorna eduardo
3 + '3'         //retorna 33
'3' + 3         //retorna 33

var x = 3       //declarando variável
-x              //retorna -3
x               //retorna 3