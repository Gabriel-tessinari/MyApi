const UserDBGateway = require('../database/UserDBGateway');

class DeleteUseCase {
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

module.exports = new DeleteUseCase();