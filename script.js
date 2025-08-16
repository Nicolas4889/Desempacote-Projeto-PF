//Criar um jogo de desempacotamento, em que o usuário organiza elementos e é comparada a organização do usuário com a planejada para o level.

//Cria uma função que analisa se os objetos das listas fase e jogador são iguais nos mesmos índices e retorna uma lista com todos os valores que satisfazem a função.
const organizador = (fase, jogador) => {
    return fase.filter((objetoEsperado, indice) => {
        return objetoEsperado === jogador[indice];
    })
}
//Cria uma função que calcula a porcentagem de acerto do jogador, isto é, mede o quão próximo o jogador chegou de acertar a posição dos objetos.
//Essa função será implementada na função comparador
const porcentagem = (fase, jogador) => (jogador/fase)*100
//Cria uma função responsável por analisar se o tamanho da lista da fase é igual ao tamanho da lista filtrada pela função organizadora, e então retorna se sim ou não.

const comparador = (fase, jogador) => (a, ...b) => {
    jogador = [a,...b]
    const resultadoOrganizador = organizador(fase,jogador)
    resultadoPorcentagem= porcentagem(fase.length, resultadoOrganizador.length)
    if (resultadoOrganizador.length === fase.length){
        return "Parabéns, você completou a  fase!"
    }
    else {return `Tente Novamente! Você está ${resultadoPorcentagem}% correto` }
}
//Ou seja: As duas funções basicamente verificam se a lista organizada pelo jogador é igual à pensada pelos desenvolvedores para a fase.

//LEVEL 1:
const armário_organizado = ['alcachofra','macarrão','molho de tomate','arroz','açúcar']
const armário_usuário = ['','','','','']
console.log(comparador(armário_organizado,armário_usuário)('alcachofra','macarrão','molho de tomate','arroz','açúcar'))
