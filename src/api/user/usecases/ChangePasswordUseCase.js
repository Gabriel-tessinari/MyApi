const userDBGateway = require('../database/UserDBGateway');

const userService = require('../services/UserService');

class ChangePasswordUseCase {
    async changePassword(user, newPassword) {
        try {
            const response = { code: '', message: '' };
            
            if(!userService.isValidPassword(newPassword)) {
                response.code = 422;
                response.message = 'Dados para alteração são inválidos.';
                return response;
            }

            const userToUpdate = await userDBGateway
            .findUserByEmailAndPassword(user.email, user.password);

            if(!userToUpdate) {
                response.code = 404;
                response.message = 'Usuário não encontrado.';
                return response;
            }

            await userDBGateway.changePassword(user.id, newPassword);
            response.code = 200;
            response.message = 'Senha alterada com sucesso.';
            return response;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = new ChangePasswordUseCase();