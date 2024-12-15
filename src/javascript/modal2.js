const modal = document.getElementById('modalEditarPerfil');
const btnEditarPerfil = document.getElementById('btnEditarPerfil');
const fecharModalBtn = document.getElementById('fecharModalBtn');
const cancelarBtn = document.getElementById('cancelarBtn');

btnEditarPerfil.onclick = () => {
    modal.style.display = 'block';
};

fecharModalBtn.onclick = () => {
    modal.style.display = 'none';
};

cancelarBtn.onclick = () => {
    modal.style.display = 'none';
};

function previewFotoPerfil(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function() {
        const imgPerfil = document.getElementById('imgPerfil');
        imgPerfil.src = reader.result;
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};