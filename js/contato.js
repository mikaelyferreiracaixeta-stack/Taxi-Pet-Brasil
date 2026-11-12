document.addEventListener("DOMContentLoaded", function() {
    const formContato = document.getElementById("formContato");
    const inputTelefone = document.getElementById("telefoneContato");
    const statusContato = document.getElementById("statusContato");

    // 1. Preenche nome e telefone se o cliente já tiver cadastro salvo
    const tutorSalvo = JSON.parse(localStorage.getItem("usuarioTaxiPet"));
    if (tutorSalvo) {
        document.getElementById("nomeContato").value = tutorSalvo.nome || "";
        document.getElementById("telefoneContato").value = tutorSalvo.whatsapp || "";
    }

    // 2. Máscara automática para WhatsApp ((61) 99999-9999)
    if (inputTelefone) {
        inputTelefone.addEventListener("input", function(e) {
            let valor = e.target.value.replace(/\D/g, "");
            if (valor.length > 11) valor = valor.slice(0, 11);
            valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
            valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
            e.target.value = valor;
        });
    }

    // 3. Processa o envio da mensagem
    if (formContato) {
        formContato.addEventListener("submit", function(evento) {
            evento.preventDefault();

            const nome = document.getElementById("nomeContato").value.trim();
            const telefone = inputTelefone.value.trim();
            const assunto = document.getElementById("assuntoContato").value;
            const mensagem = document.getElementById("mensagemContato").value.trim();

            if (mensagem.length < 10) {
                statusContato.style.color = "red";
                statusContato.innerText = "Por favor, escreva uma mensagem um pouco mais detalhada.";
                return;
            }

            statusContato.style.color = "green";
            statusContato.innerText = "Mensagem preparada! Abrindo atendimento no WhatsApp...";

            const telefoneEmpresa = "5561999999999"; // Substitua pelo número oficial da empresa
            const textoWhats = `📩 *CONTATO PELO SITE - TÁXI PET BRASIL*\n\n` +
                `*Nome:* ${nome}\n` +
                `*WhatsApp:* ${telefone}\n` +
                `*Assunto:* ${assunto}\n` +
                `*Mensagem:* ${mensagem}`;

            setTimeout(function() {
                window.open(`https://wa.me{telefoneEmpresa}?text=${encodeURIComponent(textoWhats)}`, "_blank");
                formContato.reset();
                statusContato.innerText = "Mensagem enviada com sucesso!";
            }, 800);
        });
    }
});
