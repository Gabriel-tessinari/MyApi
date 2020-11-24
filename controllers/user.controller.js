const UserUsecase = require('../usecases/UserUsecase');

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await UserUsecase.getUser(name, password);

        if(user == undefined) {
            res.status(422).send('Usuário não cadastrado.\nNome/Email ou Senha incorreto.');
        }

        res.send(user);
    }
    catch(err) {
        res.status(400).send('Erro ao procurar por usuário.');
    }
};

const registerNewUser = async (req, res) => {
    try {
        const user = req.body;
        const response = await UserUsecase.postUser(user);

        res.status(response.code).send(response.message);
    }
    catch(err) {
        console.log(err);
        res.status(400).send('Erro ao registrar usuário.');
    }
};

module.exports = {
    login,
    registerNewUser
};