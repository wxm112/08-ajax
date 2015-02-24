var searchMoive = function () {
  var query = $('#query').val();
  var omdbapi = "http://www.omdbapi.com/?";

  $.getJSON(omdbapi,{
    s: query,
  }).done(moiveList);
};

var moiveList = function (result) {
  $.each(result.Search, function(index, movie) {
    var $title = $('<div class="list"/>').text(movie.Title);
    $title.appendTo('.list_box');
  });
} 

// var processMovie = function

$(document).ready(function (){
  $('#submit').on('click', function () {
    $('.list_box').empty();
    searchMoive();
  }); 
});
