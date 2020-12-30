const UserUsecase = require('../usecases/UserUsecase');
const UpdateUseCase = require('../usecases/UpdateUseCase');
const RegisterUseCase = require('../usecases/RegisterUseCase');
const DeleteUseCase = require('../usecases/DeleteUseCase');
const LoginUseCase = require('../usecases/LoginUseCase');

const UserService = require('../services/UserService');

class UserController {
    async login(req, res) {
        try {
            const auth = req.headers.authorization;

            const { email, password } = UserService.generateUserFromAuthorization(auth);

            const user = await LoginUseCase.login(email, password);
    
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
            const response = await RegisterUseCase.register(user);
    
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
            const id = req.params.id;
            const response = await DeleteUseCase.delete(id);
    
            res.status(response.code)
            .json({ message: response.message });
        }
        catch(err) {
            console.log(err);
            res.status(400)
            .json({ message: 'Erro ao deletar usuário.' });
        }
    }

    async updateUser(req, res) {
        try {
            const user = req.body;
            const response = await UpdateUseCase.updateUser(user);

            res.status(response.code)
            .json({ message: response.message });
        }
        catch(err) {
            console.log(err);
            res.status(400)
            .json({ message: 'Erro ao alterar dados do usuário.' });
        }
    }
}

module.exports = new UserController();