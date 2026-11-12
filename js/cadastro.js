document.addEventListener("DOMContentLoaded", function() {
    const formCadastro = document.getElementById("formCadastro");
    const inputCpf = document.getElementById("cpf");
    const inputWhatsapp = document.getElementById("whatsapp");

    // 1. Máscara automática para CPF (000.000.000-00)
    if (inputCpf) {
        inputCpf.addEventListener("input", function(e) {
            let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
            if (valor.length > 11) valor = valor.slice(0, 11);
            
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            
            e.target.value = valor;
        });
    }

    // 2. Máscara automática para WhatsApp ((61) 99999-9999)
    if (inputWhatsapp) {
        inputWhatsapp.addEventListener("input", function(e) {
            let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
            if (valor.length > 11) valor = valor.slice(0, 11);
            
            valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
            valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
            
            e.target.value = valor;
        });
    }

    // 3. Envio e validação do formulário
    if (formCadastro) {
        formCadastro.addEventListener("submit", function(evento) {
            // Impede o navegador de dar erro de POST ao enviar
            evento.preventDefault();

            // Captura os dados do Tutor
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const cpf = inputCpf.value.trim();
            const whatsapp = inputWhatsapp.value.trim();
            const senha = document.getElementById("senha").value;
            const confirmaSenha = document.getElementById("confirma-senha").value;

            // Valida se o CPF tem os 11 dígitos completos (14 caracteres com pontos e traço)
            if (cpf.length < 14) {
                alert("Por favor, preencha o CPF completo com 11 números.");
                inputCpf.focus();
                return;
            }

            // Valida o tamanho mínimo da senha
            if (senha.length < 6) {
                alert("A senha deve ter no mínimo 6 caracteres.");
                document.getElementById("senha").focus();
                return;
            }

            // Valida se as duas senhas são iguais
            if (senha !== confirmaSenha) {
                alert("As senhas digitadas não conferem! Digite a mesma senha nos dois campos.");
                document.getElementById("confirma-senha").focus();
                return;
            }

            // Captura os dados do Primeiro Pet
            const primeiroPet = {
                nome: document.getElementById("nome-pet").value.trim(),
                especie: document.getElementById("especie-pet").value.trim(),
                temperamento: document.getElementById("temperamento-pet").value.trim(),
                porte: document.getElementById("porte-pet").value,
                observacoes: document.getElementById("observacoes-pet").value.trim()
            };

            // Monta o objeto do Tutor
            const dadosTutor = {
                nome: nome,
                email: email,
                cpf: cpf,
                whatsapp: whatsapp,
                senha: senha
            };

            // Salva no navegador (conectado com login.html e contaPet.html)
            localStorage.setItem("usuarioTaxiPet", JSON.stringify(dadosTutor));
            localStorage.setItem("meusPets", JSON.stringify([primeiroPet]));

            // Mostra mensagem de sucesso e redireciona para o login
            alert("Cadastro realizado com sucesso! Faça seu login para continuar.");
            window.location.href = "login.html";
        });
    }
});

