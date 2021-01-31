const joi = require('joi');

const Character = require('../model/Character');

class CharacterService {
    characterConstructor(characterJson) {
        const character = new Character({
            userId: characterJson.userId,
            name: characterJson.name,
            race: characterJson.race,
            class: characterJson.class,
            level: characterJson.level,
            exp: characterJson.exp,
            background: characterJson.background
        });

        return character;
    }

    characterValidation(character) {
        const schema = joi.object({
            userId: joi.number().required(),
            name: joi.string().min(1).required(),
            race: joi.string().min(1).required(),
            class: joi.string().min(1).required(),
            level: joi.number().required(),
            exp: joi.number().required(),
            background: joi.string()
        });

        return schema.validate(character);
    }
}

module.exports = new CharacterService();