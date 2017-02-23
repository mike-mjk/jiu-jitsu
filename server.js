var express = require('express');
var app = express();
app.use(express.static('public'));

var MOCK_VIDEOS = {
    videos: [
        {
            id: "UNr5uyJ5fKM",
            vidTitle: "Daily BJJ: No Gi Mount Basics + Armbar",
            channelTitle: "Carnage BJJ",
            thumbnail: "https://i.ytimg.com/vi/UNr5uyJ5fKM/mqdefault.jpg",
            category: "armbar"
        },
        {
            id: "kkHzgDaSkHY",
            vidTitle: "UnStoppable Arm Bar Setup From The Mount NO-GI Tutorial With Darren Goodall",
            channelTitle: "VenomFIT Online Fitness Program",
            thumbnail: "https://i.ytimg.com/vi/kkHzgDaSkHY/mqdefault.jpg",
            category: "armbar"
        },
        {
            id: "61BH9zLZct0",
            vidTitle: "Marcelo Garcia Standing Step Pass",
            channelTitle: "Abu Enes",
            thumbnail: "https://i.ytimg.com/vi/61BH9zLZct0/mqdefault.jpg",
            category: "pass"
        }
        ]
};
app.get('/videos', function(req, res) {
    res.json(MOCK_VIDEOS.videos);
});

app.get('/videos/:id', function(req, res) {
    var id = req.params.id;
    for (var i=0; i <MOCK_VIDEOS.videos.length; i++) {
        if (id == MOCK_VIDEOS.videos[i].id) {
            return res.json(MOCK_VIDEOS.videos[i]);
        }
    }
    res.json(MOCK_VIDEOS.videos);
});


// app.get('/:id', function(req, res){
//     res.sendFile(__dirname + '/public/video.html');
// });

exports.app = app;
app.listen(process.env.PORT || 8080);