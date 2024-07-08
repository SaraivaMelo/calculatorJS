Criando o relógio:

Função setHour():  Nessa função a gente vai criar a data e  a hora para exibir no display.
 > Criamos um novo objeto date com a  variavel myTime
 > Criamos uma variavel chamada myHourShow que ela recebe o get da variavel myTime e envia para a função addNum e aos mesmo tempo monta a estrutura de exibçãodo relógio
 > Adicionamos a hora no html com a variavel displayHour
 > Na variavel setDate a gente monta a estrutura da exibição da data
 > Na variavel displayDate a gente  dar um get no elemento html da data e exibe a data na tela

No setInterval a gente faz a chamada da função setHour a cada 1 segundo.
Inserimos uma chamada para a função setHour para que, assim que carregar a tela, ela ja dispare a já mostre o relógio funcionando.


Criando a Calculadora, com a função construtora Calculator.

 > this.display:  é o get no elemento html que exibe os dados na tela da calculadora
 > this.operation: é um array onde vamos adicionando os dados que o usuário digitar
 > this.start: primeiro método que deve ser chamado quando a calculadora for instanciada. Esse método vai chamr o método ClickBtn.
 > this.clickBtn: nesse método, através do addEventListener, a gente caputa o eventode click, pega o valor do botão clicado, e passa para a função analizeValue.
 > this.analizeValue: nesse método vamos analisar que valor foi clicado, utilizando um switch case. Para cada bão de ação, 
   será chamado um método. Se for um valor, a gente vai fazer um parseInt, passando o valor para o método operationCalc.
 > this.operationCal: Nesse método, o primeiro passo é verificar qual é o último valor que existe no array operation.
   Se não for um número, é um operador, com isso temos outro if para fazer a troca. Como fica?
.....

