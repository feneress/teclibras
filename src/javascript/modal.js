const sinalBtn = document.getElementById("sinal_btn");
const meuModal = document.getElementById("meuModal");
const fecharModalBtnSinal = document.getElementById("fecharModalBtn");
const cancelarBtnSinal = document.getElementById("cancelarBtn");

sinalBtn.onclick = function(event) {
    event.preventDefault();
    meuModal.style.display = "block";
}

fecharModalBtnSinal.onclick = function() {
    meuModal.style.display = "none";
}

cancelarBtnSinal.onclick = function() {
    meuModal.style.display = "none";
    alert("Ação cancelada.");
}

window.onclick = function(event) {
    if (event.target == meuModal) {
        meuModal.style.display = "none";
    }
}
