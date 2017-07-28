const express = require('express'),
    mongoose = require('mongoose'),
    request = require('request'),
    winston = require('winston');

mongoose.Promise = Promise;

winston.level = 'debug';

//DB setup
winston.debug(`Connecting to "${process.env.DB_NAME}"`);
mongoose.connect(`mongodb://${process.env.DB_NAME}:27017`, {
        useMongoClient: true
    })
    .then((db) => {
        winston.info('Mongoose OK');
    })
    .catch((err) => {
        winston.error(err);
    });

const app = express();

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.get('/classes', function(req, res) {
    request.get('http://cdn.leap.com.au/leap_classes/test/au/leap_classes.js').pipe(res);
});

app.get('/image', function(req, res) {
    request.get('https://hub.docker.com/public/images/logos/mini-logo.svg').pipe(res);
});

app.listen(3000, function() {
    winston.debug('Example app listening on port 3000!');
});