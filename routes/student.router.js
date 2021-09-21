const router = require('express').Router();

const { studentController } = require('../controllers');

router.route('/')

    .get(
        studentController.getAll
    )

    .post(
        studentController.pushNewStudent
    );

module.exports = router;
