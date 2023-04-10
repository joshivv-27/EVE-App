
var map;

function onload() {
  var locdiv = document.getElementById('loc');
  var mapdiv = document.getElementById('map')

  // Melbourne Victoria 
  var latlng = new google.maps.LatLng(-37.840935,144.946457);
  var options = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI:true
  };

  map = new google.maps.Map(mapdiv, options);
  locdiv.innerHTML = map.getCenter();

  google.maps.event.addListener(map, 'center_changed', function() {
     locdiv.innerHTML = map.getCenter();
  });
}

function findme() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var loc = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude );
    map.setCenter(loc);
  });
}

findme();