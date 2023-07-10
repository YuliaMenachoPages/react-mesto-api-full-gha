const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { NotFoundError } = require('./errors/NotFoundError');

const auth = require('./middlewares/auth');
const { handleError } = require('./middlewares/handleError');

const { createUser, login } = require('./controllers/users');
const { loginValidation, userValidation } = require('./middlewares/validationJoi');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb', {
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

app.use(errors());
app.use(handleError);
app.listen(PORT);
