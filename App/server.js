//creating a lightweight server that provides a REST API

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/kirjasto';
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => {console.log('Database connected')});

app.use(
  express.urlencoded({
    extended: true
  })
)

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});