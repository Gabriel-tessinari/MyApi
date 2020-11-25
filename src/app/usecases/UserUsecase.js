const UserDBGateway = require('../database/UserDBGateway');

const UserValidator = require('../validators/UserValidator');

class UserUsecase {
    async getUser(userData, userPassword) {
        try {
            if(UserValidator.isValidEmail(userData) && UserValidator.isValidPassword(userPassword)) {
                const user = await UserDBGateway.findUserByEmailAndPassword(userData, userPassword);
                return user;
            }
            else if(UserValidator.isValidName(userData) && UserValidator.isValidPassword(userPassword)) {
                const user = await UserDBGateway.findUserByNameAndPassword(userData, userPassword);
                return user;
            }
            else {
                return undefined;
            }
        }
        catch(err) {
            return err;
        }
    }

    async postUser(user) {
        try {
            const { name, email, password } = user;
            const response = { code: '', message: '' };
    
            if(UserValidator.isValidEmail(email) && UserValidator.isValidName(name) && UserValidator.isValidPassword(password)) {
                const verifyDB = UserDBGateway.findUserByNameAndEmail(name, email);
    
                if(verifyDB) {
                    response.code = 422;
                    response.message = 'Usuário já cadastrado.';
                    return response;
                }
                else {
                    await UserDBGateway.saveUser(user);
                    response.code = 200;
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
}

module.exports =  new UserUsecase();