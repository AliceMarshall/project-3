angular
  .module('dateNightApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      cinemas: '='
    },
    link($scope, element) {
      console.log($scope.cinemas);
      const map = new $window.google.maps.Map(element[0], {
        zoom: 12,
        center: { lat: 51.544235, lng: -0.051672 },
        scrollwheel: false
      });
      const circle1 = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.2,
        map: map,
        center: { lat: 51.544235, lng: -0.051672 },
        radius: 5000
      });
      const circle2 = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.2,
        map: map,
        center: { lat: 51.544220, lng: -0.146983 },
        radius: 5000
      });

      // const marker = new $window.google.maps.Marker({
      //   position: { lat: 51.544235, lng: -0.051672 },
      //   map: map,
      //   animation: $window.google.maps.Animation.BOUNCE
      // });
      //
      // $window.setTimeout(() => {
      //   marker.setAnimation(null);
      // }, 5000);

      // for (var city in citymap) {
        // Add the circle for this city to the map.

      // }

      $scope.cinemas.forEach(function(cinema){
        cinema.latitude = cinema.geometry.location.lat;
        console.log(cinema.latitude);
        cinema.longitude = cinema.geometry.location.lng;
        console.log(cinema.longitude);

        addMarker(cinema);
      });


      function addMarker(cinema) {
        const latLng = { lat: cinema.latitude, lng: cinema.longitude };
        console.log(latLng);
        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP
          // icon: '/assets/restaurant.svg' // Adding a custom icon
        });
        const markers = [];
        markers.push(marker);
      }

    }
  };
  return directive;
}
