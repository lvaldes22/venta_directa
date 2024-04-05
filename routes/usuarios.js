const { Router } = require('express');
const { buscarUsuario } = require('../controllers/usuarios');

const router = Router();

router.post('/validar/', buscarUsuario);

module.exports = router;