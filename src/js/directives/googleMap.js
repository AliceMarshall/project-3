angular
  .module('dateApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      cinemas: '=',
      user: '='
    },
    link($scope, element) {
      // console.log('scope', $scope.cinemas);
      console.log('user scope', $scope.user.geometry.lat);

      // const userLat = ;
      const map = new $window.google.maps.Map(element[0], {
        zoom: 12,
        center: { lat: ((($scope.user.geometry.lat-51.544235)/2)+51.544235), lng: ((($scope.user.geometry.lng+0.051672)/2)-0.051672) },
        scrollwheel: false
      });
      const circle1 = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.2,
        map: map,
        center: { lat: $scope.user.geometry.lat, lng: $scope.user.geometry.lng },
        radius: 5000
      });
      const circle2 = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.2,
        map: map,
        center: { lat: 51.544235, lng: -0.051672 },
        radius: 5000
      });
      $scope.cinemas.forEach(function(cinema){
        console.log(cinema.name);
        cinema.latitude = cinema.geometry.location.lat;
        cinema.longitude = cinema.geometry.location.lng;

        addMarker(cinema);
      });


      function addMarker(cinema) {
        const latLng = { lat: cinema.latitude, lng: cinema.longitude };
        // console.log(latLng);
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
