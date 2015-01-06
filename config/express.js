var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    busboy = require('connect-busboy');


var app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());
app.use(busboy());

app.set('views', './api/views');
app.set('view engine', 'ejs');

app.use(require('../api/routes/api'));


module.exports = app;