const UserDBGateway = require('../database/UserDBGateway');

const UserService = require('../services/UserService');

class LoginUseCase {
    async login(email, password) {
        try {
            if(
                UserService.isValidEmail(email) && 
                UserService.isValidPassword(password)
            ) {
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
}

module.exports = new LoginUseCase();