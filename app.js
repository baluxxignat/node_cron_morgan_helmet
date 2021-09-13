const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {
    variables: {
        PORT,
        DATA_BASE_PORT
    }
} = require('./config');

mongoose.connect(DATA_BASE_PORT);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    userRouter,
    carRouter,
    loginRouter
} = require('./routes');
const {
    statusCodes: {
        NOT_FOUND,
        INTERNAL_SERVER_ERROR
    }
} = require('./config');
const { messages: { M_NOT_FOUND } } = require('./config');

app.get('/ping', (req, res) => res.json('Pong'));

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/cars', carRouter);

// ERRORS HANDLER
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || NOT_FOUND,
        message: err.message || M_NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || INTERNAL_SERVER_ERROR)
        .json({
            message: err.message
        });
}
