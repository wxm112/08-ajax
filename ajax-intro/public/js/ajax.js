// var request = new XMLHttpRequest();

// request.onreadystatechange = function () {
//   console.log('readyState has changed');
//   console.log(this.readyState);
//   console.log(this.responseText);

//   if (this.readyState === 4) {
//     $('h3').text( this.responseText );
//     console.log('Done');
//   }
// };


// request.open('GET', '/slow');
// request.send(); //Asynchronous

// console.log('AJAX request is probably still running');


$(document).ready(function() {
  $('#lookup').on('click', function(event) {
    event.preventDefault();
    
    var title = $('#title').val();

    var processMovie = function(movie) {
      var $poster = $('<img>').attr('src', movie.Poster );
      $('#result').html($poster);
    };

    var url = 'http://www.omdbapi.com/';
    $.getJSON(url, {
      t: title,
    }).done(processMovie);
  });
});



$(document).ready(function() {
  $('#getJSON').on('click', function() {
    console.log('getJSON');
    $.getJSON('/getjson').done(function(result) {
      console.log('done', result.luckyNumber);
      $('#getJSONresult').html(result.currentTime);
    }).error(function() {
      alert('error');
    });
  });
});

$(document).ready(function() {
  $('#load').on('click', function() {
    // $.get('/slow').done(function(html) {
    //   $('#loadresult').html(html);
    // })
  $('#loadresult').load('/slow');
  });
});
