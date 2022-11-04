const db = require('../db.js')

module.exports = {
   listarTodos: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM PRODUTOS', (error, results)=>{
                if(error) {rejeitado(error);return;}
                aceito(results);
            });
        });
   },
   
   listarUm: (codigo) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM produtos WHERE codigo = ?', [codigo], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    },

    inserir: (descricao, preco)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO produtos (descricao, preco) VALUES (?, ?)',
                [descricao, preco],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },

    alterar:(codigo, descricao, preco)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE produtos SET descricao = ?, preco = ? WHERE codigo = ?',
                [descricao, preco, codigo],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (codigo)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM produtos WHERE codigo = ?',[codigo], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    somarValores: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT SUM(preco) as somatorio FROM PRODUTOS', (error, results)=>{
                if(error) {rejeitado(error);return;}
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]['somatorio'].toFixed(2));
                }else {
                    aceito(false);
                }
            });
        });
   },

    contarProdutos: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT COUNT(*) as total FROM PRODUTOS', (error, results)=>{
                if(error) {rejeitado(error);return;}
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]['total']);
                }else {
                    aceito(false);
                }
            });
        });
    },
};