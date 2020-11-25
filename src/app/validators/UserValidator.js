class UserValidator {
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
}

module.exports = new UserValidator();