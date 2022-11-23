const bcrypt = require('bcryptjs/dist/bcrypt.js');
const db = require('../db.js')

module.exports = {
   buscarUsuario: (usuario, senha) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    bcrypt.compare(senha, results[0]['senha'], (err, result) => {
                        if(err) return aceito(false);
                        if(result) return aceito(results[0]);
                        return aceito(false);
                    })
                }else {
                    aceito(false);
                }
            });
        });
    },

};