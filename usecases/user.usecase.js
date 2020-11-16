const { 
    findUserByNameAndPassword, 
    findUserByEmailAndPassword,
    saveUser, 
    findUserByNameAndEmail } = require('../database/user.database.gateway');

const { 
    isValidEmail, 
    isValidName, 
    isValidPassword } = require('../validators/user.validator');

    
const getUser = async (userData, userPassword) => {
    try {
        if(isValidEmail(userData) && isValidPassword(userPassword)) {
            const user = await findUserByEmailAndPassword(userData, userPassword);
            return user;
        }
        else if(isValidName(userData) && isValidPassword(userPassword)) {
            const user = await findUserByNameAndPassword(userData, userPassword);
            return user;
        }
        else {
            return undefined;
        }
    }
    catch(err) {
        return err;
    }
};

const postUser = async (user) => {
    try {
        const { name, email, password } = user;
        const response = { code: '', message: '' };

        if(isValidEmail(email) && isValidName(name) && isValidPassword(password)) {
            const verifyDB = findUserByNameAndEmail(name, email);

            if(verifyDB != undefined) {
                response.code = 422;
                response.message = 'Usuário já cadastrado.';
                return response;
            }
            else {
                await saveUser(user);
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
};

module.exports =  {
    getUser,
    postUser
};