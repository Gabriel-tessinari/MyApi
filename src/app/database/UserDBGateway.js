const pool = require('../../config/database');

class UserDBGateway {
    async findUserByNameAndPassword(userName, userPassword) {
        const user = await pool.query('SELECT name FROM users u ' +
                                  'WHERE u.name = $1 ' +
                                  'AND u.password = crypt($2, password)', 
                                  [userName, userPassword]);

        return user.rows[0];
    }

    async findUserByEmailAndPassword(userEmail, userPassword) {
        const user = await pool.query('SELECT name FROM users u ' +
                                  'WHERE u.email = $1 ' +
                                  'AND u.password = crypt($2, password)',
                                  [userEmail, userPassword]);

        return user.rows[0];
    }

    async findUserByNameAndEmail(userName, userEmail) {
        const user = await pool.query('SELECT name FROM users u ' +
                                  'WHERE u.name = $1 ' +
                                  'OR u.email = $2',
                                  [userName, userEmail]);

        return user.rows[0];
    }

    async saveUser(user) {
        const { name, email, password } = user;
        await pool.query('INSERT INTO users (name, email, password) ' +
                         'VALUES ($1, $2, crypt($3, gen_salt(\'bf\')))',
                         [name, email, password]);
    }
}

module.exports = new UserDBGateway();