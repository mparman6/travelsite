$(document).ready(function() {
  var map;


  navigator.geolocation.getCurrentPosition(initialize);

  function initialize(location) {
  console.log(location);

  var mapOptions = {
    center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

}
});

