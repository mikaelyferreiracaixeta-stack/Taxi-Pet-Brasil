document.addEventListener("DOMContentLoaded", function() {
    const formLogin = document.getElementById("formLogin");
    const inputEmail = document.getElementById("email");
    const inputSenha = document.getElementById("senha");
    const btnMostrarSenha = document.getElementById("btnMostrarSenha");
    const mensagemLogin = document.getElementById("mensagemLogin");

    // 1. Botão para mostrar ou ocultar a senha digitada
    btnMostrarSenha.addEventListener("click", function() {
        if (inputSenha.type === "password") {
            inputSenha.type = "text";
            btnMostrarSenha.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            inputSenha.type = "password";
            btnMostrarSenha.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }
    });

    // 2. Validação ao clicar em "Entrar"
    formLogin.addEventListener("submit", function(evento) {
        // Impede que a página recarregue sozinha antes de validar
        evento.preventDefault();

        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();

        // Verifica se a senha tem tamanho mínimo
        if (senha.length < 6) {
            mensagemLogin.style.color = "red";
            mensagemLogin.innerText = "A senha deve ter pelo menos 6 caracteres.";
            return;
        }

        // Busca se existe um usuário cadastrado no navegador (ou aceita um login de teste)
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioTaxiPet"));

        if ((usuarioSalvo && usuarioSalvo.email === email && usuarioSalvo.senha === senha) || 
            (email === "cliente@taxipet.com" && senha === "123456")) {
            
            mensagemLogin.style.color = "green";
            mensagemLogin.innerText = "Login realizado com sucesso! Redirecionando...";

            // Salva que o usuário está logado
            localStorage.setItem("usuarioLogado", email);

            // Redireciona para a página Meus Pets após 1,5 segundo
            setTimeout(function() {
                window.location.href = "contaPet.html";
            }, 1500);

        } else {
            mensagemLogin.style.color = "red";
            mensagemLogin.innerText = "E-mail ou senha incorretos. Tente novamente ou use cliente@taxipet.com (senha: 123456).";
        }
    });
});
