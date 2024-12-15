const enviarBtnSinal = document.getElementById("enviarBtn");
const categoriaSinal = document.getElementById("categoria");
const nomeSinal = document.getElementById("nomeSinal");

enviarBtnSinal.onclick = function() {
    const categoria = categoriaSinal.value;
    const nome = nomeSinal.value;

    if (categoria && nome) {
        enviarSugestao(categoria, nome);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

async function enviarSugestao(categoria, nome) {
    try {
        const response = await fetch('http://localhost:3000/api/sugestao/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoria, nome })
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Sugestão enviada com sucesso!\nCategoria: ${categoria}\nNome: ${nome}`);
            document.getElementById("meuModal").style.display = "none"; 
        } else {
            alert(data.message || "Erro ao enviar sugestão.");
        }
    } catch (error) {
        console.error('Erro ao enviar sugestão:', error);
        alert('Erro ao enviar sugestão. Tente novamente mais tarde.');
    }
}
