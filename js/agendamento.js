document.addEventListener("DOMContentLoaded", function() {
    const formAgendamento = document.getElementById("formAgendamento");
    const selectPorte = document.getElementById("porte-pet");
    const selectRegiao = document.getElementById("regiao");
    const valorEstimadoDisplay = document.getElementById("valor-estimado");
    const btnIrPagamento = document.getElementById("btnIrPagamento");
    const inputWhatsapp = document.getElementById("whatsapp");
    const inputData = document.getElementById("data-viagem");

    // Define a data mínima como hoje para não permitir agendar no passado
    if (inputData) {
        const hoje = new Date().toISOString().split("T")[0];
        inputData.min = hoje;
        inputData.value = hoje;
    }

    // 1. Preenche automaticamente os dados se o tutor já tiver cadastro salvo
    const tutorSalvo = JSON.parse(localStorage.getItem("usuarioTaxiPet"));
    const petsSalvos = JSON.parse(localStorage.getItem("meusPets"));

    if (tutorSalvo) {
        document.getElementById("nome").value = tutorSalvo.nome || "";
        document.getElementById("whatsapp").value = tutorSalvo.whatsapp || "";
        document.getElementById("email").value = tutorSalvo.email || "";
    }

    if (petsSalvos && petsSalvos.length > 0) {
        const primeiroPet = petsSalvos[0];
        document.getElementById("nome-pet").value = primeiroPet.nome || "";
        
        // Seleciona a espécie automaticamente
        if (primeiroPet.especie && primeiroPet.especie.toLowerCase().includes("gato")) {
            document.getElementById("tipo-pet").value = "Gato";
        } else if (primeiroPet.especie) {
            document.getElementById("tipo-pet").value = "Cachorro";
        }

        // Seleciona o porte automaticamente
        if (primeiroPet.porte === "Pequeno") selectPorte.value = "Pequeno (Até 10kg)";
        if (primeiroPet.porte === "Médio") selectPorte.value = "Médio (11kg a 25kg)";
        if (primeiroPet.porte === "Grande") selectPorte.value = "Grande (Acima de 25kg)";
    }

    // 2. Máscara automática para WhatsApp ((61) 99999-9999)
    if (inputWhatsapp) {
        inputWhatsapp.addEventListener("input", function(e) {
            let valor = e.target.value.replace(/\D/g, "");
            if (valor.length > 11) valor = valor.slice(0, 11);
            valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
            valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
            e.target.value = valor;
        });
    }

    // 3. Calcula o valor da corrida em tempo real
    let valorFinal = 20;

    function atualizarPreco() {
        const valorBase = Number(selectRegiao.value) || 20;
        const porteTexto = selectPorte.value;
        
        let adicionalPorte = 0;
        if (porteTexto.includes("Médio")) adicionalPorte = 5;
        if (porteTexto.includes("Grande")) adicionalPorte = 10;

        valorFinal = valorBase + adicionalPorte;
        valorEstimadoDisplay.innerText = `R$ ${valorFinal.toFixed(2).replace(".", ",")}`;
    }

    selectRegiao.addEventListener("change", atualizarPreco);
    selectPorte.addEventListener("change", atualizarPreco);
    atualizarPreco();

    // 4. Coleta todos os dados preenchidos no formulário
    function coletarDadosPedido() {
        const radioAcompanhante = document.querySelector('input[name="acompanhante"]:checked');
        return {
            tutor: document.getElementById("nome").value.trim(),
            whatsapp: document.getElementById("whatsapp").value.trim(),
            email: document.getElementById("email").value.trim(),
            pet: document.getElementById("nome-pet").value.trim(),
            especie: document.getElementById("tipo-pet").value,
            porte: selectPorte.value,
            acompanhante: radioAcompanhante ? radioAcompanhante.value : "Sim",
            origem: document.getElementById("origem").value.trim(),
            destino: document.getElementById("destino").value.trim(),
            data: inputData.value,
            hora: document.getElementById("hora-viagem").value,
            valor: valorFinal.toFixed(2)
        };
    }

    // 5. Botão Verde -> Salva e abre o WhatsApp com o pedido formatado
    formAgendamento.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const pedido = coletarDadosPedido();
        localStorage.setItem("agendamentoAtual", JSON.stringify(pedido));

        const telefoneEmpresa = "5561999999999"; // Troque pelo WhatsApp oficial do Táxi Pet
        const texto = `🐾 *AGENDAMENTO TÁXI PET BRASIL* 🐾\n\n` +
            `*Tutor:* ${pedido.tutor} (${pedido.whatsapp})\n` +
            `*Pet:* ${pedido.pet} (${pedido.especie} - ${pedido.porte})\n` +
            `*Acompanhante:* ${pedido.acompanhante}\n` +
            `*Data/Hora:* ${pedido.data} às ${pedido.hora}\n` +
            `*Origem:* ${pedido.origem}\n` +
            `*Destino:* ${pedido.destino}\n` +
            `*Valor Estimado:* R$ ${pedido.valor.replace(".", ",")}`;

        window.open(`https://wa.me{telefoneEmpresa}?text=${encodeURIComponent(texto)}`, "_blank");
    });

    // 6. Botão Azul -> Salva o pedido e redireciona para o Pagamento
    btnIrPagamento.addEventListener("click", function() {
        if (!formAgendamento.checkValidity()) {
            formAgendamento.reportValidity();
            return;
        }
        const pedido = coletarDadosPedido();
        localStorage.setItem("agendamentoAtual", JSON.stringify(pedido));
        window.location.href = "pagamento.html";
    });
});
