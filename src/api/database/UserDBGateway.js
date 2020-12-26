const pool = require('../../config/database');

class UserDBGateway {
    async findUserByEmailAndPassword(userEmail, userPassword) {
        const user = await pool.query('SELECT * FROM users ' +
                                      'WHERE email = $1 ' +
                                      'AND password = crypt($2, password)',
                                      [userEmail, userPassword]);

        return user.rows[0];
    }

    async findUserByEmail(userEmail) {
        const user = await pool.query('SELECT id, name FROM users ' +
                                      'WHERE email = $1', [userEmail]);

        return user.rows[0];
    }

    async saveUser(user) {
        const { name, email, password } = user;
        await pool.query('INSERT INTO users (name, email, password) ' +
                         'VALUES ($1, $2, crypt($3, gen_salt(\'bf\')))',
                         [name, email, password]);
    }

    async deleteUserById(userId) {
        await pool.query('DELETE FROM users ' +
                         'WHERE id = $1', [userId]);
    }
}

module.exports = new UserDBGateway();