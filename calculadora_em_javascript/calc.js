//Separando o objetivo em 2 tarefas. Primeiro mostrar o botão clicado na tela da calculadora e segundo executar o cálculo.
// Isso significa que, usando input, eu tenho texto mas para executar o cálculo final, precisarei converter pra número bruto

var tela = document.getElementById('telacalculadora')
var botoesNumeros = document.getElementsByClassName('botoesnumeros')
var botaoApaga = document.getElementsByClassName('botaoapaga')
var botoesOperacao = document.getElementsByClassName('botoesoperacao')
var Operador = ["+", "-", "*", "/", "^", "x"]
var inicio=0

// botoesnumeros é uma classe com vários botoes, então precisei colocar um AddEventListenner para cada botão
// e fiz isso através do seguinte loop
for(let botao of botoesNumeros){ 
botao.addEventListener('click', numeroNaTela)
}

var botaoDEL = document.getElementById('Del');
botaoDEL.addEventListener('click', apagaDEL);

var botaoAC= window.document.getElementById('AC')
botaoAC.addEventListener('click', apagaAC)

var botaoigualA = window.document.getElementById('igual')
botaoigualA.addEventListener('click', igualA)


for(let botao of botoesOperacao){ 
botao.addEventListener('click', numeroNaTela)
}


function numeroNaTela(e) {
      
  var isOperador = Operador.includes(e.currentTarget.value)
      

     //Se estiver zerado, está no início do cálculo
      if(tela.value=="0"){
      tela.value = e.currentTarget.value

      }
      // Se a variável início for 1, significa que a tela mostra o valor após clicar =
      // Nesse caso se o próximo botão digitado for número, ele limpa e começa o cálculo do início,
      // se for um operador, ele continua o cálculo a partir do último resultado 
      else if (inicio == 1 && !isOperador) { 
        tela.value = e.currentTarget.value
        
      }else {tela.value = tela.value + e.currentTarget.value
            inicio=0
      }
    }

    function apagaAC(){
         tela.value = 0
         inicio = 0
    }

    function apagaDEL(){
        tela.value = tela.value.slice(0,-1)

    }

    function igualA(){
      
      tela.value= tela.value.replace("x", "*")
      tela.value= tela.value.replace("^", "**")
      tela.value= tela.value.replace(",", ".")

      var resultado = new Function("return " + tela.value)()
      tela.value = resultado.toLocaleString("pt-BR")

      inicio = 1
    }


