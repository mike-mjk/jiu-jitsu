var source = $('#h-test').html();

var template = Handlebars.compile(source);

var context = {name: 'Mike'};

var html = template(context);

console.log(html);