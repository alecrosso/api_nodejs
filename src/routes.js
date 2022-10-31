const express = require('express');
const router = express.Router();

const ProdutoController = require('./controllers/ProdutoController')

router.get('/produtos', ProdutoController.listarTodos);
router.get('/produto/:codigo', ProdutoController.listarUm);
router.post('/produto', ProdutoController.inserir);
router.put('/produto/:codigo', ProdutoController.alterar);
router.delete('/produto/:codigo', ProdutoController.excluir);


module.exports = router;
