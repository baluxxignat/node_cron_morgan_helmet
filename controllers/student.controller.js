const studentService = require('../services/MySQL/student.service');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const students = await studentService.findAll();

            res.json(students);
        } catch (e) {
            next(e);
        }
    },

    pushNewStudent: async (req, res, next) => {
        try {
            const newOne = await studentService.createNewStudent(req.body);

            res.json(newOne);
        } catch (e) {
            next(e);
        }
    }
};
