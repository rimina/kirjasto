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

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
app.use('/', indexRouter);
app.use('/api', apiRouter);

//BOOK API
/*app.route('/api')
    .get(function(req, res){
        res.status(200).send({books : [
          {
            tittle : "Place holder book",
            author : "no-one",
            description : "this book doesn't really exist"
          },
          {
            tittle : "Another place holder book",
            author : "no-one but a different person",
            description : "this book doesn't really exist either"
          },
          {
            tittle : "Place holder book for dummies",
            author : "no-one but still a different one",
            description : "this book might exist."
          }
        ]});
    })
    .post(function(req, res){

        res.sendStatus(201);
    });*/

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});