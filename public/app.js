var MOCK_VIDEOS = {
    videos: [
        {
            id: "UNr5uyJ5fKM",
            title: "Daily BJJ: No Gi Mount Basics + Armbar",
            channelTitle: "Carnage BJJ",
            thumbnail: "https://i.ytimg.com/vi/UNr5uyJ5fKM/mqdefault.jpg",
            description: "description text 1",
            tags: ['tag1', 'tag2', 'tag3'],
            submitter: 'firstname lastname',
            dateAdded: 1487961653997
        },
        {
            id: "kkHzgDaSkHY",
            title: "UnStoppable Arm Bar Setup From The Mount NO-GI Tutorial With Darren Goodall",
            channelTitle: "VenomFIT Online Fitness Program",
            thumbnail: "https://i.ytimg.com/vi/kkHzgDaSkHY/mqdefault.jpg",
            description: "description text 2",
            tags: ['tag1', 'tag2', 'tag3']
        },
        {
            id: "61BH9zLZct0",
            title: "Marcelo Garcia Standing Step Pass",
            channelTitle: "Abu Enes",
            thumbnail: "https://i.ytimg.com/vi/61BH9zLZct0/mqdefault.jpg",
            description: "description text 2",
            tags: ['tag1', 'tag2', 'tag3']
        }
        ]
};

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getCategoryVideos(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_VIDEOS)}, 1);
	console.log('these are ' + JSON.stringify(MOCK_VIDEOS));
}

// this function stays the same when we connect
// to real API later (version without categories and hopefully not messy)
function displayCategoryVideos(data) {
    var correctList = $('#added-videos');
    for (index in data.videos) {
        //var cat = data.videos[index].category;
        
        var thumbnailLink = '<a href="/watch/' + data.videos[index].id + '"><img src=' + data.videos[index].thumbnail + '></a>';
        var mongoId = data.videos[index]._id
        console.log(mongoId)
	    correctList.append('<li id="' + mongoId + '">' + thumbnailLink + '</li>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayVideos() {
	getCategoryVideos(displayCategoryVideos);
}

var baseURL = 'https://www.googleapis.com/youtube/v3/videos'

//takes a youtube video resource and adds video object to mock videos array
function createVideoObject(data) {
    if (data.items.length == 1) {
        var video = {};
        
        video.id = data.items[0].id;
        video.title = data.items[0].snippet.title;
        video.channelTitle = data.items[0].snippet.channelTitle;
        video.thumbnail = data.items[0].snippet.thumbnails.medium.url;
        video.description = data.items[0].snippet.description;
        video.tags = data.items[0].snippet.tags;
        
        
        
        
        //code to push directly to mock videos
        //MOCK_VIDEOS.videos.push(video);
        //console.log(MOCK_VIDEOS);
    }
    //attempt to pass video object to ajax post
    return video;
}

function getDataFromApi(videoId) {
	var query = {
		id: videoId,
		part: 'snippet',
		r: 'json',
		key: 'AIzaSyCIdQfwZ7qDSA1BhnfzEBa-6AB8ma8YY9k'
	};
	//attempt to pass video object to ajax post
	var video;
	$.getJSON(baseURL, query, function(data) {
	    //attempt to pass video object to ajax post
 	    video = createVideoObject(data);
 	});
 	//attempt to pass video object to ajax post
 	return video;
}

//attempt to pass video object to ajax post
function addVideo(video) {
        $.ajax('/videos', {
        type: 'POST',
        data: JSON.stringify(video),
        dataType: 'json',
        contentType: 'application/json'
    });
}

function onSubmit() {
    $('#add-video-form').on('submit', function(e){
        e.preventDefault();
        //attempt to pass video object to ajax post
        var video;
        var videoId = $(this).find('#add-video-input').val();
        videoId = videoId.trim();
        videoId = videoId.slice(-11);
        //attempt to pass video object to ajax post
        video = getDataFromApi(videoId);
        addVideo(video);
        
        getAndDisplayVideos();
    })
}

//  on page load do this
$(function() {
	getAndDisplayVideos();
	onSubmit();
	//getDataFromApi('UNr5uyJ5fKM')
});

