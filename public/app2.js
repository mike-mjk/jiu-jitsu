
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

//runs template() from handlebars.js on videos in mongo
function displayCategoryVideos(data) {
    template(data);
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
        $(this).find('#add-video-input').val('');
        videoId = videoId.trim();
        videoId = videoId.slice(-11);
        getDataFromApi(videoId);
    });
}

function onDelete() {
    $('.video-list').on('click', '.delete', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        console.log(id);
        $.ajax('/videos/' + id, {
            type: 'DELETE'
        })
        .done(function(){
        getAndDisplayVideos();
    });
    });
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
	onDelete();
});

