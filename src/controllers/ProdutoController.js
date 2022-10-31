const ProdutoService = require('../services/ProdutoService')

module.exports = {
    listarTodos: async(req, res)=>{
        let json = {error:'', result:[]};   //retorna um array
        let produtos = await ProdutoService.listarTodos();

        for(let i in produtos){
            json.result.push({
                codigo: produtos[i].codigo,
                descricao: produtos[i].descricao,
                preco: produtos[i].preco
            });
        }
        res.json(json);
    },

    listarUm: async(req, res)=>{
        let json = {error:'', result:{}}; //retorna um objeto
        let codigo = req.params.codigo;
        let produto = await ProdutoService.listarUm(codigo);

        if(produto){
            json.result = produto;
        }
        
        res.json(json);
    },

    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let descricao = req.body.descricao;
        let preco = req.body.preco;

        if (descricao && preco){
            let ProdutoCodigo = await ProdutoService.inserir(descricao, preco);
            json.result = {
                codigo: ProdutoCodigo,
                descricao,
                preco
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo;
        let descricao = req.body.descricao;
        let preco = req.body.preco;

        if (codigo && descricao && preco){
            await ProdutoService.alterar(codigo, descricao, preco);
            json.result = {
                codigo,
                descricao,
                preco
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await ProdutoService.excluir(req.params.codigo);
        
        res.json(json);
    },
};