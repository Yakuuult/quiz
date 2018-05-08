


<!-- ////***************   Apated from Web GIS practicals week 1 (Tracking Your Location)   *************//  --> 
function trackLocation() {
 if (navigator.geolocation) 
                {navigator.geolocation.watchPosition(showPosition);} 
 else           {document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";}
 
 navigator.geolocation.watchPosition(getDistanceFromPoint);
}

function showPosition(position) {
 document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude;
 L.circle([position.coords.latitude, position.coords.longitude], 5, {
                      color: 'blue',
                      fillColor: '#f03',
                      fillOpacity: 0.5}
	     ).addTo(mymap).bindPopup(position.coords.latitude.toString()+","+position.coords.longitude.toString()+"<br />I am here.").openPopup();
}
<!-- //*********  Changed based on the appendix in Web GIS practicals    *********//   --> 
function getDistanceFromPoint(position) {
var geoJSONString = getgeojson('http://developer.cege.ucl.ac.uk:30272/getGeoJSON/questionapp/geom');
var geoJSON = JSON.parse(geoJSONString);
for(var i = 0; i < geoJSON[0].features.length; i++) {
      var feature = geoJSON[0].features[i];
          for (component in feature){
	          if (component =="geometry"){
	        	    for (geometry in feature[component]){
		    	             var lng=feature[component][geometry][0];
				             var lat=feature[component][geometry][1];
                             // return the distance in kilometers
                             var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');
                                 document.getElementById('showDistance').innerHTML = "Distance: " + distance;
                                       if (distance>0.001){
	                                           L.marker([lat, lng]).addTo(mymap).bindPopup("<b>Within 1km</b>").openPopup();
											            triggerquiz(i); //here triger related question
														}
                                               }
                              }
                     }
           }
}
<!-- //**************    Changed based on the appendix in Web GIS practicals    ******//    --> 
function triggerquiz(i) {
var geoJSONString = getgeojson('http://developer.cege.ucl.ac.uk:30272/getGeoJSON/questionapp/geom');
var geoJSON = JSON.parse(geoJSONString);
    document.getElementById("questionid").innerHTML =geoJSON[0].features[i].properties.questionid;
    document.getElementById("question").innerHTML =geoJSON[0].features[i].properties.question;
    document.getElementById("answernumber1").innerHTML =geoJSON[0].features[i].properties.answer1;
    document.getElementById("answernumber2").innerHTML =geoJSON[0].features[i].properties.answer2;
    document.getElementById("answernumber3").innerHTML =geoJSON[0].features[i].properties.answer3;
    document.getElementById("answernumber4").innerHTML =geoJSON[0].features[i].properties.answer4;
}

<!-- //**************	Changed based on the https://stackoverflow.com/   ******//    --> 
	function getgeojson(url) {
        var resp ;
        var xmlHttp ;
        resp  = '' ;
        xmlHttp = new XMLHttpRequest();
        if(xmlHttp != null){
		                   xmlHttp.open( "GET", url, false );
                           xmlHttp.send( null );
                           resp = xmlHttp.responseText;
						   }
        return resp ;
}

<!--  //*************Adapted from Web GIS practical week 1 (Calculating Distance from a Fixed Point) *********//  --> 
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