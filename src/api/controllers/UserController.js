const UserUsecase = require('../usecases/UserUsecase');

const UserService = require('../services/UserService');

class UserController {

    async login(req, res) {
        try {
            const auth = req.headers.authorization;

            const { email, password } = UserService.generateUserFromAuthorization(auth);

            const user = await UserUsecase.login(email, password);
    
            if(!user) {
                res.status(422)
                .json({ message: 'Usuário não cadastrado. Email ou Senha incorreto.' });
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
            const response = await UserUsecase.register(user);
    
            res.status(response.code)
            .json({ message: response.message });
        }
        catch(err) {
            console.log(err);
            res.status(400)
            .json({ message: 'Erro ao registrar usuário.' });
        }
    }

    async deleteAccount(req, res) {
        try {
            const { name } = req.body;
            const response = await UserUsecase.delete(name);
    
            res.status(response.code)
            .json({ message: response.message });
        }
        catch(err) {
            console.log(err);
            res.status(400)
            .json({ message: 'Erro ao deletar usuário.' });
        }
    }
}

module.exports = new UserController();