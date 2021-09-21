const db = require('../../dataBase/MySQL');

module.exports = {
    findAll: async () => {
        const [dbResponse] = await db.query('SELECT * FROM students') || [];

        return dbResponse;
    },

    createNewStudent: (userObject) => {
        const { age, gender, name } = userObject;

        return db.query(`INSERT INTO students (age, gender, name) VALUES ('${age}', '${gender}', '${name}')`);
    }
};
