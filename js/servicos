document.addEventListener("DOMContentLoaded", function() {
    const selectEspera = document.getElementById("tempoEspera");
    const valorEsperaDisplay = document.getElementById("valorEspera");

    // 1. Atualiza o valor do simulador de hora parada em tempo real
    if (selectEspera && valorEsperaDisplay) {
        selectEspera.addEventListener("change", function() {
            const valor = Number(selectEspera.value);
            valorEsperaDisplay.innerText = `Adicional: R$ ${valor.toFixed(2).replace(".", ",")}`;
        });
    }

    // 2. Salva o serviço escolhido no navegador e leva para a página de agendamento
    window.escolherServico = function(nomeServico) {
        localStorage.setItem("servicoEscolhido", nomeServico);
        window.location.href = "agendamento.html";
    };

    // 3. Abre o WhatsApp direto com mensagem de emergência veterinária
    window.chamarUrgencia = function() {
        const telefoneEmpresa = "5561999999999"; // Troque pelo número oficial do Táxi Pet
        const mensagem = "🚨 *URGÊNCIA TÁXI PET BRASIL* 🚨\nOlá! Preciso de um transporte prioritário para levar meu pet ao veterinário com urgência.";
        
        const linkWhatsApp = `https://wa.me{telefoneEmpresa}?text=${encodeURIComponent(mensagem)}`;
        window.open(linkWhatsApp, "_blank");
    };
});
