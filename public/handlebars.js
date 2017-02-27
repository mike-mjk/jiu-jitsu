// $(function () {
//   // Grab the template script
//   var theTemplateScript = $("#video-template").html();

//   // Compile the template
//   var theTemplate = Handlebars.compile(theTemplateScript);

//   // Define our data object
//   var context={
//     "videoId": "UNr5uyJ5fKM",
//     "thumbnail": "https://i.ytimg.com/vi/UNr5uyJ5fKM/mqdefault.jpg",
//   };

//   // Pass our data to the template
//   var theCompiledHtml = theTemplate(context);

//   // Add the compiled html to the page
//   $('.video-list').html(theCompiledHtml);
// });

// $


var vidarr = [
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
        ];



function template(videos) {
  // Grab the template script
  var theTemplateScript = $("#video-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
      videos
    // "videoId": "UNr5uyJ5fKM",
    // "thumbnail": "https://i.ytimg.com/vi/UNr5uyJ5fKM/mqdefault.jpg",
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.video-list').html(theCompiledHtml);
};

// $(function() {
//     template();
// });

//exports.template =template();