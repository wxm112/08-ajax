var omdbapi = "http://www.omdbapi.com/?";

var searchMoive = function () {
  var query = $('#query').val();
  $.getJSON(omdbapi,{
    s: query,
  }).done(moiveList);
};


var moiveList = function (result) {
  if(result.Response === 'False'){
    var $msg = $('<div class="error"/>').text("Sorry, there is no such movie!");
    $msg.appendTo('.list_box');
  } else if (result.Search.length === 1) {
      addMovie(result.Search[0]);
      searchInfo($('.list')[0]);
  } else {
      $.each(result.Search, function(index, movie) {
      addMovie(movie);
      });
    };
};

var addMovie = function (movie) {
  var $title = $('<button class="list"/>').text(movie.Title);
      $title.appendTo('.list_box');
};


var infoList = function (result) {
  var url = result.Poster
  if (url === "N/A") {
    var $msg = $('<div class="error"/>').text("This movie doesn't have a poster.");
    $msg.appendTo('.info');
  } else {
      var $img = $('<img>').attr('src', url);
      $img.appendTo('.info');  
    }; 
};

var searchInfo = function(movie){
  var title = $(movie).text();
      $.getJSON(omdbapi, {
        t: title,
        plot: 'full',
      }).done(infoList);
};

$(document).ready(function(){
  $('#submit').on('click', function () {
    $('.list_box').empty();
    $('.info').empty();
    searchMoive();
    $('#query').val("");
    $('#query').focus();
  }); 

  $('.list_box').on('click', 'button', function () {
    $('.info').empty();
    searchInfo(this);
  });
});
