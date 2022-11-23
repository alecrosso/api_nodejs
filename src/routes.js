const express = require('express');
const router = express.Router();

const ProdutoController = require('./controllers/ProdutoController');
const UsuarioController = require('./controllers/UsuarioController');
const Login = require('./middlewares/Login')

router.get('/produtos', Login, ProdutoController.listarTodos);
router.get('/produto/:codigo', Login, ProdutoController.listarUm);
router.post('/produto', Login, ProdutoController.inserir);
router.put('/produto/:codigo', Login, ProdutoController.alterar);
router.delete('/produto/:codigo', Login, ProdutoController.excluir);
router.get('/produtos/indicadores', Login, ProdutoController.indicadores);

router.post('/usuario/logar', UsuarioController.logar);

module.exports = router;
