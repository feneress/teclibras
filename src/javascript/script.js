$(document).ready(function() {
    const categoria = window.location.pathname.split('/').pop().replace('.html', '');

    function carregarSinais(categoria) {
        let containerSelector = '';

        if (categoria === 'desenv') {
            containerSelector = '.categoria-1-list';
        } else if (categoria === 'hardware') {
            containerSelector = '.categoria-2-list';
        } else if (categoria === 'redes') {
            containerSelector = '.categoria-3-list';
        } else if (categoria === 'software') {
            containerSelector = '.categoria-4-list';
        }

        if (!containerSelector) {
            console.error('Categoria desconhecida!');
            return;
        }

        $.ajax({
            url: `http://localhost:3000/api/sinais/${categoria}`,
            type: 'GET',
            success: function(data) {
                $(containerSelector).empty();

                if (data.length > 0) {
                    const sinais = data;

                    function exibirSinais(sinaisExibidos) {
                        $(containerSelector).empty();

                        if (sinaisExibidos.length > 0) {
                            sinaisExibidos.forEach(function(sinal) {
                                const sinalItem = `
                                <div class="sinal-item" data-id="${sinal.id}">
                                    <h2 class="titulo-sinal">${sinal.nome}</h2>
                                    <video src="${sinal.video_url}" controls></video>
                                    <div class="sinal-descricao">
                                        <p class="texto-sinal">${sinal.explicacao}</p>
                                        <p class="texto-sinal">${sinal.descricao}</p>
                                        <div class="sinal-botoes">
                                            <button class="btn-excluir" data-id="${sinal.id}"><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                                `;
                                $(containerSelector).append(sinalItem);
                            });

                            $('.btn-excluir').on('click', function() {
                                const sinalId = $(this).data('id');
                                
                                $.ajax({
                                    url: `http://localhost:3000/api/sinais/${sinalId}`,
                                    type: 'DELETE',
                                    success: function(response) {
                                        $(`[data-id="${sinalId}"]`).remove();
                                        alert('Sinal excluído com sucesso!');
                                    },
                                    error: function(err) {
                                        console.error('Erro ao excluir sinal:', err);
                                        alert('Erro ao tentar excluir o sinal.');
                                    }
                                });
                            });
                        } else {
                            $(containerSelector).append('<p>Não há sinais para esta categoria.</p>');
                        }
                    }

                    exibirSinais(sinais);

                    function filtrarSinais(termo) {
                        const resultados = sinais.filter(sinal => {
                            return sinal.nome.toLowerCase().includes(termo.toLowerCase()) ||
                                   sinal.explicacao.toLowerCase().includes(termo.toLowerCase()) ||
                                   sinal.descricao.toLowerCase().includes(termo.toLowerCase());
                        });
                        exibirSinais(resultados);
                    }

                    $('#search-input').on('input', function() {
                        const pesquisaTermo = $(this).val().trim();
                        filtrarSinais(pesquisaTermo);
                    });
                    
                    $('.fa-magnifying-glass').click(function() {
                        const pesquisaTermo = $('#search-input').val().trim();
                        filtrarSinais(pesquisaTermo);
                    });

                } else {
                    $(containerSelector).append('<p>Não há sinais para esta categoria.</p>');
                }
            },
            error: function(err) {
                console.error('Erro ao carregar sinais:', err);
                $(containerSelector).append('<p>Erro ao carregar os sinais.</p>');
            }
        });
    }

    carregarSinais(categoria);
});
