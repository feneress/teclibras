const express = require('express');
const multer = require('multer');
const sinaisController = require('../controllers/sinaisController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/adicionar', upload.single('video_url'), sinaisController.createSinal);
router.delete('/excluir/:id', sinaisController.deleteSinal);
router.get('/:categoria', sinaisController.getSinaisByCategoria);

module.exports = router;
