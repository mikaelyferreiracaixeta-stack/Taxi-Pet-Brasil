document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Configura o botão do WhatsApp automaticamente
    const btnWhatsapp = document.querySelector(".btn-whatsapp");
    
    if (btnWhatsapp) {
        const telefone = "5561999999999"; // Coloque seu número com 55 + 61
        const mensagem = "Olá! Vi o site do Táxi Pet Brasil e gostaria de pedir um orçamento para o Gama/DF.";
        
        btnWhatsapp.href = `https://wa.me{telefone}?text=${encodeURIComponent(mensagem)}`;
    }

    // 2. Mensagem de teste no Console (aperte F12 para ver)
    console.log("JavaScript do Táxi Pet Brasil carregado com sucesso!");
});