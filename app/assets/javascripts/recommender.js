// recommender.js




var map;
// var markers = [];
var directionsDisplay;
var directionsService;

function initialize() {
  
  var vancouver = new google.maps.LatLng(49.2827,-123.1207);
  var richmond = new google.maps.LatLng(49.1667,-123.1333);

  var styles = [
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
          { color: '#c6c6c6' },
          { hue: '#2200ff' },
          { visibility: 'simplified' }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'all',
      stylers: [
        { color: '#66ccff' }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'labels',
      stylers: [
        { color: '#000000' },
        { visibility: 'simplified' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        { color: '#ff9933' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [
        { color: '#000000' },
        { visibility: 'simplified' }
      ]
    },{
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
          // { color: '#00ddff' },
          { hue: '#00ddff' }
          // { visibility: 'simplified' }
      ]
    }
    // ,{
    //   featureType: 'landscape.natural',
    //   elementType: 'all',
    //   stylers: [
    //       { color: '#6bb26b' }
    //       // { hue: '#00ddff' }
    //       // { visibility: 'simplified' }
    //   ]
    // }
  ];

  var mapOptions = {
    mapTypeControlOptions: {
      mapTypeIds: ['Styled']
    },
    center: vancouver,
    zoom: 11,
    disableDefaultUI: true, 
    mapTypeId: 'Styled'
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
  map.mapTypes.set('Styled', styledMapType);

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  
  calcRoute();


  // event listener
  google.maps.event.addListener(map, 'dragend', function() {
    // console.log(map.getCenter());
    console.log(map.getBounds())
  });
  google.maps.event.addListener(map, 'zoom_changed', function() {
    console.log(map.getZoom());
  });

  // var request = {
  //   location: new google.maps.LatLng(47.6097, -122.3331),
  //   radius: 500,
  //   types: ['store']
  // };
  // var service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);


  
  var input = document.getElementById('query');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); 
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    google.maps.event.addDomListener(radioButton, 'click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);



  

}//initialize


function calcRoute() {
  // var start = document.getElementById("start").value;
  // var end = document.getElementById("end").value;
  var request = {
    origin: 'vancouver, bc',
    destination:'seattle, wa',
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var step1 = result.routes[0].legs[0].steps[0].instructions;
      // console.log(result.routes[0]);
      //console.log(step1);
      directionsDisplay.setDirections(result);
      directionsDisplay.setMap(map);

      //show places
      console.log(result.routes[0].overview_path.length);
      //console.log(result.routes[0].overview_path[0].lng());
      var service = new google.maps.places.PlacesService(map);
      console.log(map.getBounds());
      for(var i=0; i<result.routes[0].overview_path.length; i+=20) {
        //console.log(i);

        var ptLat = result.routes[0].overview_path[i].lat();
        var ptLng = result.routes[0].overview_path[i].lng();
        //console.log(ptLat);
        var pl_request = {
          location: new google.maps.LatLng(ptLat, ptLng),
          radius: 500
          // types: ['store']
        };
        service.nearbySearch(pl_request, callback);
      }


    }
  });
}

var count = 0;
function callback(results, status){
  console.log('callback');
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log('Results length:' + results.length);
    for (var i = 0; i < results.length; i++) {
      count++;
    // console.log('count: '+ count);
      createMarker(results[i]);
      if (i == results.length - 1) {
        console.log(results.length - 1)
      }
    }
  } 
  // else if(status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
  //   setTimeout(function() {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }
  //   }, 200);
    
  // }
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  // debugger
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });
}


