const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const {
    variables: {
        PORT,
        DATA_BASE_PORT,
        WHITE_LIST_ORIGINS
    },
    statusCodes: { FORBIDDEN },
    messages: { CORS_FORBIDEN }
} = require('./config');

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
const { ErrorHandler } = require('./errors');
const cronJobs = require('./cron');
const { swagger } = require('./docs');

// MONGOOSE
mongoose.connect(DATA_BASE_PORT);

// APP MAIN
const app = express();

app.use(expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));

app.use(cors({ origin: _configureCors }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

// MORGAN
if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger));
// ROUTES
app.get('/ping', (req, res) => res.json('Pong'));
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/cars', carRouter);

// SERVER STARTED
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    cronJobs();

    require('./utils/defaultUser');
});

// ERRORS HANDLER
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

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

// CORS CONFIG
function _configureCors(origin, callback) {
    const whiteList = WHITE_LIST_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(FORBIDDEN, CORS_FORBIDEN), false);
    }

    return callback(null, true);
}
