var bros = [ 
  {
    name: 'Groucho',
    instrument: 'guitar',
    funFact: 'Danced the Charleston on the Hitlers bunker'
  },

  {
    name: 'Harpo',
    instrument: 'harp',
    funFact: 'HAHA'
  },

  {
    name: 'Chico',
    instrument: 'piano',
    funFact: 'Eliot'
  }
];

// var brosHTML = function (brother) {
//   var $p = $('<p/>')
//   var $name = $('<b>').text(brother.name)
//   $p.html(' plays ' + brother.instrument);
//   $p.prepend($name);
//   return $p;
// }

$(document).ready(function () {
  var template = $('#brosTemplate').html()
  var brosHTML = Handlebars.compile(template);


  for (var i = 0; i < bros.length; i++) {
    var brother = bros[i];
    var $p = brosHTML(brother);
    $('#details').append($p);
  }
});