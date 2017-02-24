var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();
app.use(express.static('public'));

var mustacheExpress = require('mustache-express'); 
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache'); 
app.set('views', __dirname + '/public');

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

app.get('/watch/:id', function(req, res){
    res.render('video.html', {
        videoID: req.params.id
    });
});

exports.app = app;
exports.runServer = runServer;
app.listen(process.env.PORT || 8080);