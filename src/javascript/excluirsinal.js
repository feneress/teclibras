document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.btn-excluir');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const sinalId = e.target.closest('.sinal-item').getAttribute('data-id');
        const confirmDelete = confirm('Tem certeza que deseja excluir este sinal?');
  
        if (!confirmDelete) {
          return;
        }
  
        try {
          const response = await fetch(`http://localhost:3000/api/sinais/${sinalId}`, {
            method: 'DELETE'
          });
  
          if (response.ok) {
            const data = await response.json();
            alert(data.message);
  
            e.target.closest('.sinal-item').remove();

            const categoria = window.location.pathname.split('/').pop().replace('.html', '');
            carregarSinais(categoria);
          } else {
            const errorData = await response.json();
            alert(errorData.error || 'Erro ao excluir o sinal.');
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
          alert('Erro ao conectar ao servidor.');
        }
      });
    });
});
