function opcoes() {
    window.location.href = 'opcoes.html';
}

function game() {
    window.location.href = 'game_show.html';
}

function placar() {
    window.location.href = 'placar.html';
}

function inicio() {
    window.location.href = 'inicio.html';
}

function parar() {
    fimDeJogo();
}

function fimDeJogo() {
    const pontuacaoFinal = pontos / 2; // Calcula a pontuação final com metade dos pontos obtidos
    document.querySelector('.painel_jogo').style.display = 'none';
    document.getElementById('fim_jogo').style.display = 'block';
    document.getElementById('pontuacao_final').textContent = pontuacaoFinal;
}


let perguntasUtilizadas = [];
let perguntas;
let perguntaAtual;
let pontos = 0;
let indicePontuacao = 0;
const sequenciaPontuacao = [
    1000, 2000, 3000, 4000, 5000,
    10000, 20000, 30000, 40000, 50000,
    100000, 200000, 300000, 400000, 500000,
    1000000
];
let universitariosUsado = false;

// Função para carregar as perguntas do arquivo JSON
async function carregarPerguntas() {
    const response = await fetch('perguntas_show.json');
    perguntas = await response.json();
    novaPergunta();
}

// Função para exibir uma nova pergunta
function novaPergunta() {
    resetarCoresAlternativas();
    // Filtra as perguntas que ainda não foram utilizadas
    const perguntasDisponiveis = perguntas.filter(pergunta => !perguntasUtilizadas.includes(pergunta));
    // Seleciona uma pergunta aleatória entre as perguntas disponíveis
    perguntaAtual = perguntasDisponiveis[Math.floor(Math.random() * perguntasDisponiveis.length)];
    // Adiciona a pergunta atual à lista de perguntas utilizadas
    perguntasUtilizadas.push(perguntaAtual);
    // Exibe a pergunta e as alternativas na tela
    document.getElementById('pergunta_id').textContent = perguntaAtual.question;
    document.getElementById('alternativa1_id').textContent = perguntaAtual.answers[0].text;
    document.getElementById('alternativa2_id').textContent = perguntaAtual.answers[1].text;
    document.getElementById('alternativa3_id').textContent = perguntaAtual.answers[2].text;
    document.getElementById('alternativa4_id').textContent = perguntaAtual.answers[3].text;
}


// Função para pular a pergunta e desativar o botão
function pularPergunta(botao) {
    botao.style.backgroundColor = 'gray';
    botao.disabled = true;
    novaPergunta();
}

// Função para confirmar a resposta
function confirmarResposta(indice) {
    const resposta = confirm("Você está certo disso?");
    if (resposta) {
        if (perguntaAtual.answers[indice].correct) {
            pontos = sequenciaPontuacao[indicePontuacao];
            indicePontuacao = Math.min(indicePontuacao + 1, sequenciaPontuacao.length - 1);
            document.getElementById('placar').textContent = "Placar: " + pontos;
            novaPergunta();
        } else {
            fimDeJogo();
        }
    }
}

// Função para terminar o jogo
function fimDeJogo() {
    document.querySelector('.painel_jogo').style.display = 'none';
    document.getElementById('fim_jogo').style.display = 'block';
    document.getElementById('pontuacao_final').textContent = pontos / 2;
}

// Função para pedir ajuda aos universitários
function universitarios() {
    if (!universitariosUsado) {
        alert("Os universitários sugerem a resposta correta!");
        for (let i = 0; i < perguntaAtual.answers.length; i++) {
            if (perguntaAtual.answers[i].correct) {
                document.getElementById(`alternativa${i + 1}_id`).style.backgroundColor = 'lightgreen';
            }
        }
        universitariosUsado = true;
        const btn = document.getElementById('universitarios_btn');
        btn.style.backgroundColor = 'gray';
        btn.disabled = true;
    }
}

// Função para processar a resposta do jogador
function responder(indice) {
    confirmarResposta(indice);
}

// Função para resetar as cores das alternativas
function resetarCoresAlternativas() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`alternativa${i}_id`).style.backgroundColor = '';
    }
}

// Chamar a função para carregar perguntas ao carregar a página
window.onload = carregarPerguntas;
