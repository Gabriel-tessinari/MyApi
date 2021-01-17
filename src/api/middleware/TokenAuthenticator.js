const jwt = require('jsonwebtoken');
const { promisify } = require('util');

class TokenAuthenticator {
    async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401)
            .json({ message: 'Token não foi recebido.' });
        }

        const [, token] = authHeader.split(' ');

        try {
            await promisify(jwt.verify)(token, process.env.APP_SECRET);
    
            return next();
            
        } catch(err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }
    }
}

module.exports = new TokenAuthenticator();