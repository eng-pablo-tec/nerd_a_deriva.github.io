// Definindo as variáveis de escolha e placar
let escolha_1 = "";
let escolha_2 = "";
let vitorias = 0;
let derrotas = 0;

// Adicionando ouvintes de eventos aos botões de escolha
document.getElementById("botao_pedra").addEventListener("click", function() {
    escolha_1 = "pedra";
    jogar();
});

document.getElementById("botao_papel").addEventListener("click", function() {
    escolha_1 = "papel";
    jogar();
});

document.getElementById("botao_tesoura").addEventListener("click", function() {
    escolha_1 = "tesoura";
    jogar();
});

function jogar() {
    // Gerar a escolha aleatória do computador
    const escolhas = ["pedra", "papel", "tesoura"];
    escolha_2 = escolhas[Math.floor(Math.random() * escolhas.length)];

    // Determinar o vencedor
    let resultado = "";

    if (escolha_1 === escolha_2) {
        resultado = "Empate!";
    } else if (
        (escolha_1 === "pedra" && escolha_2 === "tesoura") ||
        (escolha_1 === "papel" && escolha_2 === "pedra") ||
        (escolha_1 === "tesoura" && escolha_2 === "papel")
    ) {
        resultado = "Você venceu!";
        vitorias++;
    } else {
        resultado = "Você perdeu!";
        derrotas++;
    }

    // Exibir o resultado, a escolha do computador e o placar
    document.getElementById("escolha_computador").innerText = escolha_2;
    document.getElementById("resultado").innerText = `Você escolheu ${escolha_1}. O computador escolheu ${escolha_2}. ${resultado}`;
    document.getElementById("placar").innerText = `Vitórias: ${vitorias} - Derrotas: ${derrotas}`;
}
