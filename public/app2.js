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

//does an ajax call and passes response to displayCategoryVideos
function getCategoryVideos(callbackFn) {
	$.ajax('/videos', {
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data){
        callbackFn(data);
    });
}

//creates HTML used to display videos
function displayCategoryVideos(data) {
    var correctList = $('#added-videos');
    correctList.html("");
    for (index in data) {
        //var cat = data[index].category;
        
        var thumbnailLink = '<a href="/watch/' + data[index].id + '"><img src=' + data[index].thumbnail + '></a>';
	    var mongoId = data[index]._id;
        console.log(mongoId);
	    correctList.append('<li id="' + mongoId + '">' + thumbnailLink + '</li>');
    }
}

//runs the get and display functions on document load
function getAndDisplayVideos() {
	getCategoryVideos(displayCategoryVideos);
}


//adds event listener to add video form and passes videoId to GetDataFromApi
function onSubmit() {
    $('#add-video-form').on('submit', function(e){
        e.preventDefault();
        var videoId = $(this).find('#add-video-input').val();
        videoId = videoId.trim();
        videoId = videoId.slice(-11);
        getDataFromApi(videoId);
    })
}

//Performs getJSON on youtube API and passes response and addVideo function to createVideoObject
function getDataFromApi(videoId) {
    var baseURL = 'https://www.googleapis.com/youtube/v3/videos';
	var query = {
		id: videoId,
		part: 'snippet',
		r: 'json',
		key: 'AIzaSyCIdQfwZ7qDSA1BhnfzEBa-6AB8ma8YY9k'
	};
	$.getJSON(baseURL, query, function(data) {
 	    createVideoObject(data, addVideo);
 	});
}

//transforms API response into video object and passes it and getAndDisplayVideos callback to addVideo function
function createVideoObject(data, addVideo) {
    if (data.items.length == 1) {
        var video = {};
        
        video.id = data.items[0].id;
        video.title = data.items[0].snippet.title;
        video.channelTitle = data.items[0].snippet.channelTitle;
        video.thumbnail = data.items[0].snippet.thumbnails.medium.url;
        video.description = data.items[0].snippet.description;
        video.tags = data.items[0].snippet.tags;
        addVideo(video, getAndDisplayVideos);
    }
    else {
        alert('Not a valid video link');
    }
}

// performs ajax post to /videos route to add video to mongo and reruns getAndDisplayVideos
function addVideo(video, getAndDisplayVideos) {
        console.log('addvideo');
        console.log(video);
        $.ajax('/videos', {
        type: 'POST',
        data: JSON.stringify(video),
        dataType: 'json',
        contentType: 'application/json'
    })
    .done(function(){
        getAndDisplayVideos();
    });
}


//  on page load do this
$(function() {
	getAndDisplayVideos();
	onSubmit();
});

