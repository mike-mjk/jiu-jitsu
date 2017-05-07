function template(videos, role) {
  // Grab the template script
  var theTemplateScript;
  if (role == 'database') {
    theTemplateScript = $("#database-template").html();
 }
  else if (role == 'search') {
    console.log('search is the role');
    theTemplateScript = $("#search-template").html();
  }

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
      videos
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.video-list').html(theCompiledHtml);
};
