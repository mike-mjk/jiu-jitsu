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
}

// this function stays the same when we connect
// to real API later
function displayCategoryVideos(data) {
    for (index in data.videos) {
        var cat = data.videos[index].category;
        var correctList = $('#' + cat);
	    correctList.append(
        '<li id="' + data.videos[index].id + '">' + data.videos[index].vidTitle + '<br />' + data.videos[index].channelTitle + '<br /> <img src=' + data.videos[index].thumbnail + '>' + '</li>');
        //'<a href="/' + data.videos[index].id +'">  </a>
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayVideos() {
	getCategoryVideos(displayCategoryVideos);
}


$('ul').on('click', 'li', function(){
    var id = $(this).attr('id');
    $('#ytplayer').attr('src', 'https://www.youtube.com/embed/' + id);
});




//  on page load do this
$(function() {
	getAndDisplayVideos();
});

