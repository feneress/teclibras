document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const usuario_nome = document.getElementById('usuario_nome').value;
    const senha = document.getElementById('senha').value;

    if (!usuario_nome || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const loginData = {
        usuario_nome: usuario_nome,
        senha: senha
    };

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login bem-sucedido!');
            
            localStorage.setItem('tipoUsuario', result.user.tipo);
            window.location.href = '/index.html';
        } else {
            alert(result.message || 'Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro ao fazer login', error);
        alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
    }
});
