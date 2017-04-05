var express =  require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var favicon = require('serve-favicon');
var cors = require('cors');

var config = require('../config.json');
var config_test = require('../config_test.json');

var db = require('./models/main');

var error = require('./controllers/error');
var middlewares = require('./controllers/middlewares');
var router = require('./router/index');
var chat = require('./chat/router');

var app = express();

// Cors enabling
app.use(cors());

// Passport.js auth
app.use(session({
    secret: config.secret_key,
    resave: true,
    saveUninitialized: true,
    cookie: { 
        httpOnly: false 
    }
}));
passport.use(middlewares.strategy());
app.use(passport.initialize());
app.use(passport.session());
middlewares.serialization(passport);
middlewares.deserialization(passport);

// Render templates
app.set('view engine', 'pug');
app.set('views', __dirname +  '/client/views');

// POST request and cookies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Favicon
app.use(favicon(__dirname + '/client/source/img/favicon.ico'));

// Static files
app.use('/src', express.static(__dirname + '/client/source'));

// Router
app.use('/', router);

// Errors
app.use(error.notFound);
app.use(error.renderError);

function connectToDB(testing) {
    var desc;
    if (testing) {
        desc = db.connectDB(config_test.db_port, config_test.database);
        app.set('mongodb', desc);
    } else {
        desc = db.connectDB(config.db_port, config.database);     
        app.set('mongodb', desc);
        // Chat
        app = chat(app);
    }
    return app;
}

module.exports = connectToDB;