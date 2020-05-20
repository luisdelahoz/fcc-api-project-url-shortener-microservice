require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
