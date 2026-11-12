document.addEventListener("DOMContentLoaded", function() {
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const cardsVeiculos = document.querySelectorAll(".card-veiculo");

    // 1. Filtro interativo por porte do pet
    botoesFiltro.forEach(function(botao) {
        botao.addEventListener("click", function() {
            // Atualiza o visual do botão ativo
            botoesFiltro.forEach(function(b) {
                b.style.background = "white";
                b.style.color = "#007bff";
            });
            botao.style.background = "#007bff";
            botao.style.color = "white";

            const porteSelecionado = botao.getAttribute("data-porte");

            // Mostra ou esconde os cartões conforme o filtro
            cardsVeiculos.forEach(function(card) {
                const categorias = card.getAttribute("data-categorias");

                if (porteSelecionado === "todos" || categorias.includes(porteSelecionado)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 2. Salva o veículo escolhido e leva para o agendamento
    window.selecionarVeiculo = function(nomeVeiculo) {
        localStorage.setItem("veiculoEscolhido", nomeVeiculo);
        window.location.href = "agendamento.html";
    };
});
