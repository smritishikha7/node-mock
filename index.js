// require express
const express = require('express');
// require router to define routes
const app = express();
// mongoose ORM to write mongo queries
const mongoose = require('mongoose');
// including the database config files
const bodyParser = require('body-parser');
// define the port to host
const port = process.env.PORT || 8001;
// import cors for CORS calls
const cors = require('cors');
const dbConfig = require("./config/database");
const routes = require("./routes/index");

// mongoose connection
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.mongo_url, (err) => {
    if (err) {
        console.log("Could not connect to Database", err);
    } else {
        console.log("Connected to Database");
    }
});

// middleware for CORS
app.use(cors());

//parse application/json
app.use(bodyParser.json({ extended: true, limit: '20mb' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb', parameterLimit: 15000 })); // 5mb is the limit for receiving data whereas 5000 parameters (key-value pairs) can be received


app.use('/', routes.routes);

// if route unknown send 404
app.get('**', function (req, res) {
    res.send('404');
});

// if route unknown send 404
app.post('**', function (req, res) {
    res.send('404');
});


process.on('unhandledRejection', reason => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
})

process.on('uncaughtException', exception => {
    console.log(exception); // to see your exception details in the console
    // if you are on production, maybe you can send the exception details to your
    // email as well ?
});

// Finally listen to the port
app.listen(port, () => {
    console.log('Listening to Port ' + port);
});

/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = app;