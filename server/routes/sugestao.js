const express = require('express');
const sugestaoController = require('../controllers/sugestaoController');
const router = express.Router();

router.post('/', sugestaoController.createSugestao);

module.exports = router;
