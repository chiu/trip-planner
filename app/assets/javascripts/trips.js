// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/



// carto is short for cartographer
var surveyor;
var cloud = 4;
$(document).ready(function() {



  console.log("js is loaded in");

   surveyor = {

        rendererOptions: {
            draggable: true
        },
        directionsDisplay: new google.maps.DirectionsRenderer(this.rendererOptions),
        directionsService: new google.maps.DirectionsService(),
        map: undefined,
        australia: new google.maps.LatLng(-25.274398, 133.775136),



        yolo: function() {
            console.log("hello there!!!!");
        },

        initialize: function() {
            var mapOptions = {
                zoom: 7,
                center: this.australia
            };
            this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            this.directionsDisplay.setMap(this.map);
            this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
            google.maps.event.addListener(this.directionsDisplay, 'directions_changed', function() {
                computeTotalDistance(this.directionsDisplay.getDirections());
                showWaypoints(this.directionsDisplay.getDirections());
            });
        },


        drawDirections: function() {
            console.log("draw directions happened");
            var startlocation = $("#origin_field").val();
            console.log("start:", startlocation);
            var endlocation = $("#dest_field").val();
            console.log("end:", endlocation);
            calcRoute(startlocation, endlocation);
        },

        calcRoute: function(origin_argument, destination_argument) {
            var request = {
                origin: origin_argument,
                destination: destination_argument,
                waypoints: [{
                    location: 'Vancouver, BC'
                }, {
                    location: 'Richmond, BC'
                }],
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        },

        showWaypoints: function(result) {
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                console.log(myroute.legs[i]);
            }
        },

        computeTotalDistance: function(result) {
            var total = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
            }
            total = total / 1000.0;
            document.getElementById('total').innerHTML = total + ' km';
        },

    };

    $(document).on("click", "#calculateRouteButton", surveyor.drawDirections);

    google.maps.event.addDomListener(window, 'load', surveyor.initialize);



});
