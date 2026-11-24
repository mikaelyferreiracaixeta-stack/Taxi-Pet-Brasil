document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputCpf = document.getElementById("cpf");
  const inputIdMotorista = document.getElementById("id_motorista");
  const inputCnh = document.getElementById("cnh");
  const inputTelefone = document.getElementById("telefone");
  const inputWhatsapp = document.getElementById("whtsap");
  const inputAno = document.getElementById("ano");
  const inputPlaca = document.getElementById("placa");

  // --- FUNÇÃO AUXILIAR PARA MÁSCARA DE TELEFONE / WHATSAPP ---
  function aplicarMascaraTelefone(input) {
    if (!input) return;
    input.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "");
      if (valor.length > 11) valor = valor.slice(0, 11);

      if (valor.length > 10) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (valor.length > 5) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
      } else if (valor.length > 0) {
        valor = valor.replace(/^(\d*)/, "($1");
      }

      e.target.value = valor;
    });
  }

  aplicarMascaraTelefone(inputTelefone);
  aplicarMascaraTelefone(inputWhatsapp);

  // --- CPF (11 NÚMEROS) + VÍNCULO AUTOMÁTICO COM O CARRO ---
  if (inputCpf) {
    inputCpf.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "").slice(0, 11);
      e.target.value = valor;

      // Copia o CPF automaticamente para o campo "ID do Motorista Vinculado"
      if (inputIdMotorista) {
        inputIdMotorista.value = valor;
      }
    });
  }

  // --- CNH (APENAS NÚMEROS - ATÉ 11 DÍGITOS) ---
  if (inputCnh) {
    inputCnh.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 11);
    });
  }

  // --- ANO DO VEÍCULO (APENAS NÚMEROS - 4 DÍGITOS) ---
  if (inputAno) {
    inputAno.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });
  }

  // --- PLACA DO VEÍCULO (PADRÃO ANTIGO OU MERCOSUL EM MAIÚSCULO) ---
  if (inputPlaca) {
    inputPlaca.addEventListener("input", (e) => {
      e.target.value = e.target.value
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 7);
    });
  }

  // --- VALIDAÇÃO E ENVIO DO FORMULÁRIO ---
  if (form) {
    form.addEventListener("submit", (e) => {
      const cpfLimpo = inputCpf ? inputCpf.value.replace(/\D/g, "") : "";
      const cnhLimpa = inputCnh ? inputCnh.value.replace(/\D/g, "") : "";
      const whatsLimpo = inputWhatsapp ? inputWhatsapp.value.replace(/\D/g, "") : "";
      const placaLimpa = inputPlaca ? inputPlaca.value.trim() : "";

      if (cpfLimpo.length !== 11) {
        e.preventDefault();
        alert("Por favor, digite um CPF válido com 11 números.");
        inputCpf.focus();
        return;
      }

      if (cnhLimpa.length < 9) {
        e.preventDefault();
        alert("Por favor, digite um número de CNH válido.");
        inputCnh.focus();
        return;
      }

      if (whatsLimpo.length < 10) {
        e.preventDefault();
        alert("Por favor, digite um número de WhatsApp válido com DDD.");
        inputWhatsapp.focus();
        return;
      }

      if (placaLimpa.length !== 7) {
        e.preventDefault();
        alert("A placa do veículo deve ter 7 caracteres (ex: ABC1D23).");
        inputPlaca.focus();
        return;
      }

      // Simula o salvamento enquanto o action estiver como "#"
      if (form.getAttribute("action") === "#") {
        e.preventDefault();
        const nomeMotorista = document.getElementById("nome_motorista").value;
        const modeloCarro = document.getElementById("modelo").value;
        alert(`Condutor "${nomeMotorista}" e veículo "${modeloCarro} (${placaLimpa})" cadastrados com sucesso!`);
        form.reset();
      }
    });
  }
});
