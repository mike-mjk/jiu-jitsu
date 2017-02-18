var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/:id', function(req, res){
    console.log('hi' + req.params.id);
    res.sendFile(__dirname + '/public/video.html');
});

exports.app = app;
app.listen(process.env.PORT || 8080);