const loginUseCase = require('../usecases/LoginUseCase');
const registerUseCase = require('../usecases/RegisterUseCase');
const deleteUseCase = require('../usecases/DeleteUseCase');
const updateUseCase = require('../usecases/UpdateUseCase');
const changePasswordUseCase = require('../usecases/ChangePasswordUseCase');

const userService = require('../services/UserService');

class UserController {
    async login(req, res) {
        try {
            const auth = req.headers.authorization;

            const { email, password } = userService
            .generateUserFromAuthorization(auth);

            const user = await loginUseCase.login(email, password);
    
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

            const response = await registerUseCase.register(user);
    
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

            const response = await deleteUseCase.delete(id);
    
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

            const response = await updateUseCase.updateUser(user);

            res.status(response.code)
            .json({ message: response.message });
        }
        catch(err) {
            console.log(err);
            res.status(400)
            .json({ message: 'Erro ao alterar dados do usuário.' });
        }
    }

    async changePassword(req, res) {
        try {
            const user = req.body.user;
            const newPassword = req.body.newPassword;

            const response = await changePasswordUseCase
            .changePassword(user, newPassword);

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