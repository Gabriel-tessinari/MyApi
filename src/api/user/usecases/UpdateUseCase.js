const UserDBGateway = require('../database/UserDBGateway');

const UserService = require('../services/UserService');

class UpdateUseCase {
    async updateUser(user) {
        try {
            const response = { code: '', message: '' };
            
            if(
                (user.name == '' || !UserService.isValidName(user.name)) && 
                (user.email == '' || !UserService.isValidEmail(user.email) ||
                user.password == '' || !UserService.isValidPassword(user.password))
            ) {
                response.code = 422;
                response.message = 'Dados para alteração são inválidos.';
                return response;
            }

            const userToUpdate = await UserDBGateway.findUserById(user.id);

            if(!userToUpdate) {
                response.code = 404;
                response.message = 'Usuário não encontrado.';
                return response;
            }

            if(user.name) {
                userToUpdate.name = user.name;
            }

            if(user.email && user.password) {
                const userEmailVerifier = await UserDBGateway
                .findUserByEmail(user.email);

                if(userEmailVerifier) {
                    response.code = 422;
                    response.message = 'Email já vinculado a outro usuário.';
                    return response;
                }

                const userVerifyPassword = await UserDBGateway
                .findUserByEmailAndPassword(userToUpdate.email, user.password);

                if(!userVerifyPassword) {
                    response.code = 422;
                    response.message = 'Senha incorreta.';
                    return response;
                }

                userToUpdate.email = user.email;
            }

            await UserDBGateway.updateUser(userToUpdate);
            response.code = 200;
            response.message = 'Dados alterados com sucesso.';
            return response;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = new UpdateUseCase();