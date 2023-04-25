'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const route = require('./routes');
const db = require('./config/db');
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(cookieParser());
app.use(express.json());

// Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Routes init
route(app);

//Connect to DB
db.connect();

app.listen(port, () => console.log(`Connection!!! http://localhost:${port}`));

//AUTHENTICATION
//AUTHORIZATION
