document.addEventListener('DOMContentLoaded', function() {
    const tipoUsuario = localStorage.getItem('tipoUsuario');
  
    const mobileButtons = document.querySelectorAll('#mobile_btn, #mobile_login');
    const adminButtons = document.querySelectorAll('.btn-flutuante, .btn-excluir');
  
    if (tipoUsuario === 'adm') {
        mobileButtons.forEach(button => {
            button.innerText = 'Sair';
            
            button.addEventListener('click', () => {

                localStorage.removeItem('tipoUsuario');
                
                window.location.href = '/login.html';
            });
        });
  
        adminButtons.forEach(button => {
            button.style.display = 'block';
        });
  
        console.log('Bem-vindo, administrador!');
    } else {
        mobileButtons.forEach(button => {
            button.style.display = 'block';
        });
  
        adminButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
  });
  