const UserDBGateway = require('../database/UserDBGateway');

const UserService = require('../services/UserService');

class RegisterUseCase {
    async register(user) {
        try {
            const { name, email, password } = user;
            const response = { code: '', message: '' };
    
            if(
                UserService.isValidEmail(email) && 
                UserService.isValidName(name) && 
                UserService.isValidPassword(password)
            ) {
                const verifyDB = await UserDBGateway.findUserByEmail(email);
    
                if(verifyDB) {
                    response.code = 422;
                    response.message = 'Usuário já cadastrado.';
                    return response;
                }
                
                await UserDBGateway.saveUser(user);
                response.code = 201;
                response.message = 'Cadastro efetuado com sucesso.';
                return response;
            }

            response.code = 422;
            response.message = 'Dados para cadastro são inválidos.';
            return response;  
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = new RegisterUseCase();