const UsuarioService = require('../services/UsuarioService')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

module.exports = {
    
    logar: async(req, res) => {
        let json = {error:'', result:{}};

        let usuario = req.body.usuario;
        let senha = req.body.senha;

        if (usuario && senha){
            let objUsuario = await UsuarioService.buscarUsuario(usuario, senha);
            if(objUsuario){
                var token = jwt.sign({codigo: objUsuario['codigo'], usuario: objUsuario['usuario']}, process.env.SECRET, {
                    expiresIn: 300
                });
                json = ({auth: true, token: token});
            } else {
                json.error = 'falha na autenticação!';
            }
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

};