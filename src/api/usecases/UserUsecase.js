const UserDBGateway = require('../database/UserDBGateway');

const UserService = require('../services/UserService');

class UserUsecase {
    async login(email, password) {
        try {
            if(UserService.isValidEmail(email) && UserService.isValidPassword(password)) {
                const user = await UserDBGateway.findUserByEmailAndPassword(email, password);
                if(user) {
                    user.password = null;
                    return { user, token: UserService.generateToken(user) };
                }
            }

            return undefined;
        }
        catch(err) {
            return err;
        }
    }

    async register(user) {
        try {
            const { name, email, password } = user;
            const response = { code: '', message: '' };
    
            if(UserService.isValidEmail(email) && UserService.isValidName(name) && UserService.isValidPassword(password)) {
                const verifyDB = await UserDBGateway.findUserByEmail(email);
    
                if(verifyDB) {
                    response.code = 422;
                    response.message = 'Usuário já cadastrado.';
                    return response;
                }
                else {
                    await UserDBGateway.saveUser(user);
                    response.code = 201;
                    response.message = 'Cadastro efetuado com sucesso.';
                    return response;
                }
            }
            else {
                response.code = 422;
                response.message = 'Dados para cadastro são inválidos.';
                return response;
            }  
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }

    async delete(userId) {
        try {
            const response = { code: '', message: '' };
    
            await UserDBGateway.deleteUserById(userId);
            response.code = 200;
            response.message = 'Conta deletada com sucesso.';
            return response;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }
}

module.exports =  new UserUsecase();