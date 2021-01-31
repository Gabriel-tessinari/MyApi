const characterUseCase = require('../usecases/CreateUseCase');
const characterService = require('../services/CharacterService');
const Character = require('../model/Character');

class CharacterController {
    async create(req, res) {
        try {
            const { error } = characterService.characterValidation(req.body);
            if(error !== undefined) {
                return res.status(400)
                .json({ message: 'Dados do inválidos para criação personagem.' });
            }

            const character = characterService.characterConstructor(req.body);

            const response = await characterUseCase.create(character)
    
            return res.status(response.code)
            .json({ message: response.message });
        }
        catch(err) {
            res.status(400)
            .json({ message: 'Erro ao registrar o personagem.' });
        }
    }
}

module.exports = new CharacterController();