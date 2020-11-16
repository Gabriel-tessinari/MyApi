const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

const isValidPassword = (password) => {
    return !(password.length <= 5 || password === '' || password === undefined);
};

const isValidName = (name) => {
    return !(name === '' || name === undefined);
};

module.exports = {
    isValidEmail,
    isValidPassword,
    isValidName
};