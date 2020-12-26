const jwt = require('jsonwebtoken');

class UserService {
    isValidEmail(email) {
        const regEx = /\S+@\S+\.\S+/;
        return regEx.test(email);
    }

    isValidPassword(password) {
        return !(password.length <= 5 || password === '' || password === undefined);
    }

    isValidName(name) {
        return !(name === '' || name === undefined);
    }

    generateUserFromAuthorization(auth) {
        const [, encodedAuth] = auth.split(' ');
        const emailAndPass = Buffer.from(encodedAuth, 'base64').toString();
        const [email, password] = emailAndPass.split(':');

        return { email, password };
    }

    generateToken(user) {
        return 'Bearer ' + 
        jwt.sign({ id: user.id }, process.env.APP_SECRET, { expiresIn: '1d' });
    }
}

module.exports = new UserService();