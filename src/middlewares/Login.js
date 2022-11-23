const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.send({message: 'Token não adquirido'});

        const decode = jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) return res.send({message: 'Falha na autenticação'})
            next();
        })
    } catch (err){
        return res.send({message: 'Falha na autenticação'});
    }
  
}