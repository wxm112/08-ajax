var omdbapi = "http://www.omdbapi.com/?";

var searchMoive = function () {
  var query = $('#query').val();
  $.getJSON(omdbapi,{
    s: query,
  }).done(moiveList);
};

var showError = function(error) {
  var $msg = $('<div class="error"/>').text(error);
    $msg.appendTo('.error');
}

var moiveList = function (result) {
  if(result.Response === 'False'){
    showError("Sorry, there is no such movie!");    
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
    showError("This movie doesn't have a poster.");
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

var submitFn = function () {
    $('.list_box').empty();
    $('.info').empty();
    $('.error').empty();
    searchMoive();
    $('#query').val("");
    $('#query').focus();
  };

$(document).ready(function(){

  $('#submit').on('click', submitFn); 
  
  $(document).on('keypress', function(event) {
    if (event.which === 13) {
      submitFn();
    };
  });

  $('.list_box').on('click', 'button', function () {
    $('.info').empty();
    $('.error').empty();
    searchInfo(this);
    $('#query').focus();
  });
});
