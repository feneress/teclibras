const modal = document.getElementById('modalEditar');
const fecharModalBtn = document.getElementById('fecharModalBtn');
const cancelarBtn = document.getElementById('cancelarBtn');
const btnAdd = document.getElementById('btn_adicionar');
const videoInput = document.getElementById('video');
const nomeSinalInput = document.getElementById('nomeSinal');
const explicacaoInput = document.getElementById('explicacao');
const descricaoInput = document.getElementById('descricao');

btnAdd.onclick = () => {
    modal.style.display = 'block';
};

fecharModalBtn.onclick = () => {
    modal.style.display = 'none';
    resetModal();
};

cancelarBtn.onclick = () => {
    modal.style.display = 'none';
    resetModal();
};

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        resetModal();
    }
});

function resetModal() {
    nomeSinalInput.value = '';
    explicacaoInput.value = '';
    descricaoInput.value = '';
    videoInput.value = '';
}
