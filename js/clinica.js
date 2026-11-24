document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputCnpj = document.getElementById("cnpj");
  const inputTelefone = document.getElementById("telefone");

  // --- MÁSCARA DE CNPJ (00.000.000/0000-00) ---
  if (inputCnpj) {
    inputCnpj.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
      if (valor.length > 14) valor = valor.slice(0, 14);

      valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

      e.target.value = valor;
    });
  }

  // --- MÁSCARA DE TELEFONE / PLANTÃO ((00) 0000-0000 ou (00) 00000-0000) ---
  if (inputTelefone) {
    inputTelefone.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "");
      if (valor.length > 11) valor = valor.slice(0, 11);

      if (valor.length > 10) {
        // Formato Celular / WhatsApp: (00) 00000-0000
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (valor.length > 5) {
        // Formato Fixo: (00) 0000-0000
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
      } else if (valor.length > 0) {
        valor = valor.replace(/^(\d*)/, "($1");
      }

      e.target.value = valor;
    });
  }

  // --- VALIDAÇÃO E ENVIO DO FORMULÁRIO ---
  if (form) {
    form.addEventListener("submit", (e) => {
      const cnpjLimpo = inputCnpj ? inputCnpj.value.replace(/\D/g, "") : "";
      const telLimpo = inputTelefone ? inputTelefone.value.replace(/\D/g, "") : "";

      // Verifica se o CNPJ tem 14 números
      if (cnpjLimpo.length !== 14) {
        e.preventDefault();
        alert("Por favor, digite um CNPJ válido com 14 números.");
        inputCnpj.focus();
        return;
      }

      // Verifica se o telefone tem pelo menos 10 números (DDD + número)
      if (telLimpo.length < 10) {
        e.preventDefault();
        alert("Por favor, digite um telefone válido com DDD.");
        inputTelefone.focus();
        return;
      }

      // Se o action ainda estiver como "#", simula o cadastro salvo no front-end
      if (form.getAttribute("action") === "#") {
        e.preventDefault();
        const nomeClinica = document.getElementById("nome_clinica").value;
        alert(`Clínica "${nomeClinica}" cadastrada com sucesso!`);
        form.reset();
      }
    });
  }
});
