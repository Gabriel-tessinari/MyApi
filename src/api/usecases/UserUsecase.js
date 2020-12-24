const UserDBGateway = require('../database/UserDBGateway');

const UserService = require('../services/UserService');

class UserUsecase {
    async login(email, password) {
        try {
            if(UserService.isValidEmail(email) && UserService.isValidPassword(password)) {
                const user = await UserDBGateway.findUserByEmailAndPassword(email, password);
                return { user, token: UserService.generateToken(user) };
            }
            else {
                return undefined;
            }
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
                const verifyDB = await UserDBGateway.findUserByNameAndEmail(name, email);
    
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

    async delete(userName) {
        try {
            const response = { code: '', message: '' };
    
            await UserDBGateway.deleteUserByName(userName);
            response.code = 200;
            response.message = `${ userName }: Conta deletada com sucesso.`;
            return response;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }
}

module.exports =  new UserUsecase();