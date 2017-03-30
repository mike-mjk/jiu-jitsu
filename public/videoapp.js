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

$(function() {
    var id = $('#add-description-input').data('id');
    getDescription(id);
    submitDescription();
})