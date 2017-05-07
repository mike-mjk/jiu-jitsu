function getDescription(id) {
    $.ajax('../videos/' + id, {
        type: 'GET',
        datatype: 'json'
    })
    .done(function(data){
        console.log(data);
        $('#add-description-input').val(data.userDescription)
    });
}

function submitDescription() {
    $('#add-description-form').on('submit', function(e){
        e.preventDefault();
        var description = $('#add-description-input').val();
        description = {"description": description};
        var id = $('#add-description-input').data('id');
        
        $.ajax('/videos/'+ id + '/description', {
        type: 'PUT',
        data: JSON.stringify(description),
        dataType: 'json',
        contentType: 'application/json'
    })
    
    .done(function(){
        var id = $('#add-description-input').data('id');
        console.log(id);
        getDescription(id);
    });
    
    });
}

//copied from app2.js... better to export?
function getCategoryVideos(callbackFn) {
	$.ajax('../videos', {
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data){
        callbackFn(data);
    });
}

//runs template() from handlebars.js on videos in mongo
function displayCategoryVideos(data) {
    template(data, 'database');
    // var correctList = $('#added-videos');
    // correctList.html("");
    // for (index in data) {
    //     //var cat = data[index].category;
        
    //     var thumbnailLink = '<a href="/watch/' + data[index].id + '"><img src=' + data[index].thumbnail + '></a>';
	   // var mongoId = data[index]._id;
    //     console.log(mongoId);
	   // correctList.append('<li id="' + mongoId + '">' + thumbnailLink + '</li>');
    // }
}

//runs the get and display functions on document load
function getAndDisplayVideos() {
	getCategoryVideos(displayCategoryVideos);
}

$(function() {
    var id = $('#add-description-input').data('id');
    getDescription(id);
    submitDescription();
    getAndDisplayVideos();
})