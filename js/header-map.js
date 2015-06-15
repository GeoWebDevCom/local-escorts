function initialize() {
	var mapOptions = {
		center: { lat: 55.749792, lng: 37.632495},
		zoom: 14
	};
	var map = new google.maps.Map(document.getElementById('headerMap'),
			mapOptions);
	
	$(".header-map-trigger").click(function() {
		var t = setTimeout(function() {
			google.maps.event.trigger(map, 'resize');
			map.setCenter(new google.maps.LatLng(55.749792,37.632495));
		},1000)
	})
	
}
google.maps.event.addDomListener(window, 'load', initialize);

