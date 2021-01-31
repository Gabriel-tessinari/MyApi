const { response } = require('express');
const Character = require('../model/Character');

class CreateUseCase {
    async create(character) {
        try {
            const response = { code: '', message: '' };

            const characterExist = await Character.findOne({
                userId: character.userId,
                name: character.name
            });

            if(characterExist) {
                response.code = 422;
                response.message = 'Já existe um personagem com esse nome.';
                return response;
            }

            await character.save();

            response.code = 201;
            response.message = 'Personagem registrado com sucesso.';
            return response;
        }
        catch(err) {
            response.code = 400;
            response.message = 'Erro ao registrar o personagem.';
            return response;
        }
    }
}

module.exports = new CreateUseCase();