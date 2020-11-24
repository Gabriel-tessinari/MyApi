const UserDBGateway = require('../database/UserDBGateway');

const { 
    isValidEmail, 
    isValidName, 
    isValidPassword } = require('../validators/user.validator');

class UserUsecase {
    async getUser(userData, userPassword) {
        try {
            if(isValidEmail(userData) && isValidPassword(userPassword)) {
                const user = await UserDBGateway.findUserByEmailAndPassword(userData, userPassword);
                return user;
            }
            else if(isValidName(userData) && isValidPassword(userPassword)) {
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
    
            if(isValidEmail(email) && isValidName(name) && isValidPassword(password)) {
                const verifyDB = UserDBGateway.findUserByNameAndEmail(name, email);
    
                if(verifyDB != undefined) {
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