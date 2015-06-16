// application.html.erb signin / signup buttons throughout the site

$(function() {
  $("#start-trip-btn").on('click', function() {
    $('#div1').fadeOut(1500, function () {
      $("<div id='div2'><input type='text' name='text' placeholder='Where are you coming from?' id='index-start'/></div>").appendTo('#div-container').delay(1000).fadeIn('fast');
    });
  });
  $('.dropdown-menu input').on('click', function(e) {
    console.log('click');
    e.stopPropagation(); 
  });
});