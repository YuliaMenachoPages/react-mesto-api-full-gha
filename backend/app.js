const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const { NotFoundError } = require('./errors/NotFoundError');

const auth = require('./middlewares/auth');
const { handleError } = require('./middlewares/handleError');

const { createUser, login } = require('./controllers/users');
const { loginValidation, userValidation } = require('./middlewares/validationJoi');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(limiter);
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
