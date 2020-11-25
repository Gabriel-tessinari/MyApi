const UserUsecase = require('../usecases/UserUsecase');

class UserController {

    async login(req, res) {
        try {
            const { name, password } = req.body;
            const user = await UserUsecase.getUser(name, password);
    
            if(!user) {
                res.status(422)
                .json({ message: 'Usuário não cadastrado. Nome/Email ou Senha incorreto.' });
            }
    
            res.json(user);
        }
        catch(err) {
            res.status(400)
            .json({ message: 'Erro ao procurar por usuário.' });
        }
    }

    async registerNewUser(req, res) {
        try {
            const user = req.body;
            const response = await UserUsecase.postUser(user);
    
            res.status(response.code)
            .json({ message: response.message });
        }
        catch(err) {
            console.log(err);
            res.status(400)
            .json({ message: 'Erro ao registrar usuário.' });
        }
    }
}

module.exports = new UserController();