const db = require('../db/connection.js');

exports.createSugestao = (req, res) => {
  const { categoria, nome } = req.body;
  if (!categoria || !nome) {
    return res.status(400).json({ message: 'Categoria e nome são obrigatórios.' });
  }

  const query = 'INSERT INTO sugestao (categoria, nome) VALUES (?, ?)';
  
  db.query(query, [categoria, nome], (err, results) => {
    if (err) {
      console.error('Erro ao criar sugestão:', err);
      res.status(500).json({ message: 'Erro ao criar sugestão', error: err });
    } else {
      console.log('Sugestão criada com sucesso:', results); 
      res.status(200).json({
        message: 'Sugestão criada com sucesso',
        id: results.insertId,
        categoria,
        nome,
      });
    }
  });
};