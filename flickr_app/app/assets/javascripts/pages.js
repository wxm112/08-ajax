var pageNumber = 1;


var searchFlickr = function(pageNumber) {
  var query = $('#query').val();

  var flickrUrl = 'https://api.flickr.com/services/rest/?jsoncallback=?';

  $.getJSON(flickrUrl, {
    method: 'flickr.photos.search',
    api_key: '2f5ac274ecfac5a455f38745704ad084',
    text: query,
    format: 'json',
    page: pageNumber,
  }).done(processImages);
};

var processImages = function(result) {
  // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
  var photos = result.photos.photo;

  _(photos).each(function(photo){
    var url = [
        'https://farm',
        photo.farm,
        '.staticflickr.com/',
        photo.server,
        '/',
        photo.id,
        '_',
        photo.secret,
        '_n.jpg'
      ].join('');


      var $img = $('<img>').attr('src', url);
      $img.appendTo('#images');
  });
};

var clearImage = function () {
  if ($('#images').text !== "") {
      $('#images').empty();
  }
};

$(document).ready(function () {

  $('#search').on('click', function() {
    clearImage();
    searchFlickr();
    });  

  $('#query').on('keypress',function(event) {
    // Ignore any keypresses that are not Enter.
    if (event.which !==13) {
      return;
    } 
    clearImage();
    searchFlickr();
  });

});








