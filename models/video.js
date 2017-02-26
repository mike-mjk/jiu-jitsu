var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    channelTitle: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
    //submitter: { type: String, required: true },
    //dateAdded: { type: Number, required: true }
});

var Video = mongoose.model('Video', VideoSchema);

module.exports = Video;