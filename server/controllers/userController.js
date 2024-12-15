const db = require('../db/connection');

exports.loginUser = (req, res) => {
  const { usuario_nome, email, senha } = req.body;

  const query = email 
    ? 'SELECT * FROM usuario WHERE email = ? AND senha = ?' 
    : 'SELECT * FROM usuario WHERE usuario_nome = ? AND senha = ?';

  const loginValue = email || usuario_nome;

  db.query(query, [loginValue, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer login', error: err });
    } else if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    } else {
      const user = results[0];
      res.status(200).json({ 
        message: 'Login bem-sucedido',
        user: {
          id: user.id,
          usuario_nome: user.usuario_nome,
          email: user.email,
          tipo: user.tipo
        }
      });
    }
  });
};
