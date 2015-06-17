$(function() {
 $("#start-trip-btn").on('click', function() {
    var origin = $('#index-start').val();
    console.log(origin);

    var destination = $('#index-end').val();
    console.log(destination);
// debugger
    var options = [];
    $("#icons input").filter(":checked").each(function() {
      options.push($(this).val()); 
    });
    console.log(options);
  });
    // var ty =  $("#icons input").filter(":checked");
    //   // return $(this).val(); 
    //   // console.log($(this).val());
    //   console.log(ty);


 $('.dropdown-menu input').on('click', function(e) {
   console.log('click');
   e.stopPropagation(); 
 });
});

// $(function() {
//   $("#end-trip-btn").on('click', function() {
//     $('#div1').fadeOut(1500, function () {
//       var destination = $('index-end').val();
//       console.log(destination);
//       document.getElementById('index-end').id = 'index-start';
//       $("#end-trip-btn").attr("placeholder", "Where are you coming from?");
//       $("#end-trip-btn").text('Show Map');
//       document.getElementById('end-trip-btn').id = 'start-trip-btn';
//     });
//   });

//   $("#start-trip-btn").on('click', function() {
//     var origin = $('index-start').val();
//     console.log(origin);
//     // window.location.href='http://www.reddit.com/';
//   });


//   $('.dropdown-menu input').on('click', function(e) {
//     console.log('click');
//     e.stopPropagation(); 
//   });
// });


// -----------
// var input = document.getElementById('index-end');

//   var autocomplete = new google.maps.places.Autocomplete(input);
  // autocomplete.bindTo('bounds', map);

  // var infowindow = new google.maps.InfoWindow();
  // var marker = new google.maps.Marker({
  //   map: map,
  //   anchorPoint: new google.maps.Point(0, -29)
  // });

  // google.maps.event.addListener(autocomplete, 'place_changed', function() {
  //   infowindow.close();
  //   marker.setVisible(false);
  //   var place = autocomplete.getPlace();
  //   if (!place.geometry) {
  //     window.alert("Autocomplete's returned place contains no geometry");
  //     return;
  //   }

  //   // If the place has a geometry, then present it on a map.
  //   if (place.geometry.viewport) {
  //     map.fitBounds(place.geometry.viewport);
  //   } else {
  //     map.setCenter(place.geometry.location);
  //     map.setZoom(17); 
  //   }
  //   marker.setIcon(/** @type {google.maps.Icon} */({
  //     url: place.icon,
  //     size: new google.maps.Size(71, 71),
  //     origin: new google.maps.Point(0, 0),
  //     anchor: new google.maps.Point(17, 34),
  //     scaledSize: new google.maps.Size(35, 35)
  //   }));
  //   marker.setPosition(place.geometry.location);
  //   marker.setVisible(true);

  //   var address = '';
  //   if (place.address_components) {
  //     address = [
  //       (place.address_components[0] && place.address_components[0].short_name || ''),
  //       (place.address_components[1] && place.address_components[1].short_name || ''),
  //       (place.address_components[2] && place.address_components[2].short_name || '')
  //     ].join(' ');
  //   }

  //   // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
  //   // infowindow.open(map, marker);
  // });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  // function setupClickListener(id, types) {
  //   var radioButton = document.getElementById(id);
  //   google.maps.event.addDomListener(radioButton, 'click', function() {
  //     autocomplete.setTypes(types);
  //   });
  // }

  // setupClickListener('changetype-all', []);
  // setupClickListener('changetype-address', ['address']);
  // setupClickListener('changetype-establishment', ['establishment']);
  // setupClickListener('changetype-geocode', ['geocode']);