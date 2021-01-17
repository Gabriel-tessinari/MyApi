const pool = require('../../../config/database');

class UserDBGateway {
    async findUserById(userId) {
        const user = await pool.query('SELECT * FROM users ' +
                                      'WHERE id = $1', [userId]);
        return user.rows[0];
    }

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

    async updateUser(user) {
        const { id, name, email } = user;
        await pool.query('UPDATE users ' +
                         'SET name = $1, email = $2' +
                         'WHERE id = $3', 
                         [name, email, id]);
    }

    async changePassword(userId, newPassword) {
        await pool.query('UPDATE users ' +
                         'SET password = crypt($1, gen_salt(\'bf\')) ' +
                         'WHERE id = $2',
                         [newPassword, userId]);
    }
}

module.exports = new UserDBGateway();