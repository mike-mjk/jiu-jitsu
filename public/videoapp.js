function submitDescription() {
    $('#add-description-form').on('submit', function(e){
        e.preventDefault();
        var description = $('#add-description-input').val();
        
        var id = $('#add-description-input').data('id');
        
        $.ajax('/videos/'+ id + '/description', {
        type: 'PUT',
        data: {description: description}
    })
    .done(function(){
        
    });
    
    });
}

$(function() {
    submitDescription();
})