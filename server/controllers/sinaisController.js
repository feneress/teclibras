const db = require('../db/connection.js');

exports.createSinal = (req, res) => {
  const { nome, categoria, explicacao, descricao } = req.body;
  const video_url = req.file ? req.file.buffer : null;
  const query = 'INSERT INTO sinais (nome, categoria, explicacao, descricao, video_url) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nome, categoria, explicacao, descricao, video_url], (err, result) => {
    if (err) {
      console.error('Erro ao criar sinal:', err);
      return res.status(500).json({ error: 'Erro ao criar sinal' });
    }
    res.status(201).json({ message: 'Sinal criado com sucesso', id: result.insertId });
  });
};

exports.deleteSinal = (req, res) => {
  const sinalId = req.params.id;
  const query = 'DELETE FROM sinais WHERE id = ?';
  db.query(query, [sinalId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir sinal:', err);
      return res.status(500).json({ error: 'Erro ao excluir sinal' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Sinal não encontrado' });
    }
    res.status(200).json({ message: 'Sinal excluído com sucesso' });
  });
};

const fs = require('fs');

exports.getSinaisByCategoria = (req, res) => {
  const categoria = req.params.categoria;

  if (!categoria) {
      return res.status(400).json({ error: 'Categoria não fornecida' });
  }

  const query = 'SELECT id, nome, categoria, explicacao, descricao, video_url FROM sinais WHERE categoria = ?';

  db.query(query, [categoria], (err, results) => {
      if (err) {
          console.error('Erro ao buscar sinais:', err);
          return res.status(500).json({ message: 'Erro ao buscar sinais', error: err });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'Nenhum sinal encontrado para essa categoria' });
      }

      const sinaisComBase64 = results.map(sinal => {
          const videoBase64 = sinal.video_url.toString('base64');
          return {
              id: sinal.id,
              nome: sinal.nome,
              categoria: sinal.categoria,
              explicacao: sinal.explicacao,
              descricao: sinal.descricao,
              video_url: `data:video/mp4;base64,${videoBase64}`
          };
      });

      return res.status(200).json(sinaisComBase64);
  });
};
