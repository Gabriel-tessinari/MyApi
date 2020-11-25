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

    generateToken(user) {
        return jwt.sign({ id: user.id }, process.env.APP_SECRET);
    }
}

module.exports = new UserService();