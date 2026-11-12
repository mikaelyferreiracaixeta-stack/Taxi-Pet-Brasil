document.addEventListener("DOMContentLoaded", function() {
    const boasVindasTutor = document.getElementById("boasVindasTutor");
    const dadosContatoTutor = document.getElementById("dadosContatoTutor");
    const listaPetsContainer = document.getElementById("listaPetsContainer");
    const formNovoPet = document.getElementById("formNovoPet");
    const btnSair = document.getElementById("btnSair");

    // 1. Verifica se o usuário está logado
    const emailLogado = localStorage.getItem("usuarioLogado");
    const dadosTutor = JSON.parse(localStorage.getItem("usuarioTaxiPet"));

    if (!emailLogado) {
        alert("Você precisa fazer login para acessar seus pets!");
        window.location.href = "login.html";
        return;
    }

    // 2. Exibe os dados do Tutor no topo da página
    if (dadosTutor && dadosTutor.email === emailLogado) {
        boasVindasTutor.innerText = `Olá, ${dadosTutor.nome}!`;
        dadosContatoTutor.innerText = `E-mail: ${dadosTutor.email} | WhatsApp: ${dadosTutor.whatsapp}`;
    } else {
        boasVindasTutor.innerText = "Olá, Tutor!";
        dadosContatoTutor.innerText = `Conta conectada: ${emailLogado}`;
    }

    // 3. Função para desenhar os cartões dos pets na tela
    function renderizarPets() {
        const listaPets = JSON.parse(localStorage.getItem("meusPets")) || [];
        listaPetsContainer.innerHTML = "";

        if (listaPets.length === 0) {
            listaPetsContainer.innerHTML = "<p style='color: #666;'>Nenhum pet cadastrado ainda. Use o formulário abaixo para adicionar o primeiro!</p>";
            return;
        }

        listaPets.forEach(function(pet, index) {
            const card = document.createElement("div");
            card.style.cssText = "background: #fff; border: 1px solid #ddd; border-top: 4px solid #28a745; border-radius: 8px; padding: 18px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);";

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h3 style="margin: 0; color: #333;"><i class="fa-solid fa-paw" style="color: #28a745;"></i> ${pet.nome}</h3>
                    <button onclick="removerPet(${index})" title="Remover Pet" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 16px;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Espécie/Raça:</strong> ${pet.especie}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Porte:</strong> ${pet.porte}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Temperamento:</strong> ${pet.temperamento}</p>
                <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Observações:</strong> ${pet.observacoes || "Nenhuma observação."}</p>
            `;

            listaPetsContainer.appendChild(card);
        });
    }

    // 4. Adiciona um novo pet à lista salva
    formNovoPet.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const novoPet = {
            nome: document.getElementById("novoNomePet").value.trim(),
            especie: document.getElementById("novaEspeciePet").value.trim(),
            temperamento: document.getElementById("novoTemperamentoPet").value.trim(),
            porte: document.getElementById("novoPortePet").value,
            observacoes: document.getElementById("novasObservacoesPet").value.trim()
        };

        const listaAtual = JSON.parse(localStorage.getItem("meusPets")) || [];
        listaAtual.push(novoPet);
        localStorage.setItem("meusPets", JSON.stringify(listaAtual));

        formNovoPet.reset();
        renderizarPets();
        alert(`${novoPet.nome} foi cadastrado com sucesso!`);
    });

    // 5. Função global para excluir um pet
    window.removerPet = function(indice) {
        if (confirm("Tem certeza que deseja remover este pet da sua lista?")) {
            const listaAtual = JSON.parse(localStorage.getItem("meusPets")) || [];
            listaAtual.splice(indice, 1);
            localStorage.setItem("meusPets", JSON.stringify(listaAtual));
            renderizarPets();
        }
    };

    // 6. Botão Sair da Conta
    btnSair.addEventListener("click", function() {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "login.html";
    });

    // Carrega os pets na tela assim que a página abre
    renderizarPets();
});
