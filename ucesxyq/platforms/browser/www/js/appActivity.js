// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
maxZoom: 18,
attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);


var geoJSONString='[{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[-0.13818,51.524616]},"properties":{"name":"aa","surname":"bb","module":"cc","language":"English","modulelist":"CEGEG077||","lecturetime":"morning"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[51.5242, -0.13441]},"properties":{"name":"aa","surname":"bb","module":"cc","language":"English","modulelist":"CEGEG077||","lecturetime":"morning"}}]}]';


function trackLocation() {
 if (navigator.geolocation) {
 navigator.geolocation.watchPosition(showPosition);
 } else {
 document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
 }
 navigator.geolocation.watchPosition(getDistanceFromPoint);
}

function showPosition(position) {
 document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude +
 "<br>Longitude: " + position.coords.longitude;
 L.circle([position.coords.latitude, position.coords.longitude], 5, {
color: 'blue',
fillColor: '#f03',
fillOpacity: 0.5
}).addTo(mymap).bindPopup(position.coords.latitude.toString()+","+position.coords.longitude.toString()+"<br />I am here.").openPopup();
}

function getDistanceFromPoint(position) {
// find the coordinates of a point using this website:

var geoJSON = JSON.parse(geoJSONString);
//alert(geoJSON[0].features[1].geometry.coordinates[1]);

for(var i = 0; i < geoJSON[0].features.length; i++) {
var feature = geoJSON[0].features[i];
    for (component in feature){
	    if (component =="geometry"){
		    for (geometry in feature[component]){
			     var lng=feature[component][geometry][0];
				 var lat=feature[component][geometry][1];
				 
//alert(lng);
// return the distance in kilometers
                 var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');
                 document.getElementById('showDistance').innerHTML = "Distance: " + distance;
                     if (distance<0.16){
	                 L.marker([51.525569, -0.136046]).addTo(mymap).bindPopup("<b>Within 10m</b>").openPopup();}
 }
 }
 }
 }
}

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
 var radlat1 = Math.PI * lat1/180;
 var radlat2 = Math.PI * lat2/180;
 var radlon1 = Math.PI * lon1/180;
 var radlon2 = Math.PI * lon2/180;
 var theta = lon1-lon2;
 var radtheta = Math.PI * theta/180;
 var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
 subAngle = Math.acos(subAngle);
 subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
 dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
// where radius of the earth is 3956 miles
 if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
 if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
 return dist;
 }


