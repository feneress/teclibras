document.getElementById('enviarBtn').addEventListener('click', async () => {
    const nomeSinal = document.getElementById('nomeSinal').value;
    const categoria = document.getElementById('categoria').value;
    console.log('Categoria selecionada:', categoria);
    const explicacao = document.getElementById('explicacao').value;
    const descricao = document.getElementById('descricao').value;
    const videoUpload = document.getElementById('video').files[0];

    if (!nomeSinal || !descricao || !videoUpload || !categoria) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (!videoUpload.type.startsWith('video/')) {
        alert('Por favor, envie um arquivo de vídeo.');
        return;
    }

    const formData = new FormData();
    formData.append('nome', nomeSinal);
    formData.append('categoria', categoria);
    formData.append('explicacao', explicacao);
    formData.append('descricao', descricao);
    formData.append('video_url', videoUpload);

    try {
        const response = await fetch('http://localhost:3000/api/sinais/adicionar', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || 'Vídeo adicionado com sucesso!');

            carregarSinais(categoria);
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Ocorreu um erro ao adicionar o vídeo.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor.');
    }
});
