//map
var numbers = [1,4,9]
var doubles =  numbers.map(function(num){
    return num * 2
})
console.log(numbers)
console.log(doubles)

//converte fahrenheit para celsius
var fahrenheit = [0, 32, 45, 46, 47, 91, 93, 121];
var celsius = fahrenheit.map(function(item) {
    return Math.round((item - 32)*5/9)
})
console.log(celsius)

//filter, funciona como um filtro como o próprio nome diz

//diz que retorna um valor de acordo com a lógica descrita na função
function isBigEnough(value){
    return value >= 10
}

//cria um arry usando o filter, passando a função com a lógica que será implementada no método
var filtered = [12, 8, 5, 144, 16].filter(isBigEnough)
console.log(filtered)

//Reduce
var valor = [1.5, 2 , 4, 10]
var somatoria = valor.reduce(function(total, item){
    return total + item
}, 0)
console.log(somatoria)