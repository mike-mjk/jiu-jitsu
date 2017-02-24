var express = require('express');
var app = express();
app.use(express.static('public'));

var mustacheExpress = require('mustache-express'); 
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache'); 
app.set('views', __dirname + '/public');

app.get('/watch/:id', function(req, res){
    res.render('video.html', {
        videoID: req.params.id
    });
});

exports.app = app;
app.listen(process.env.PORT || 8080);