var Main = {
    Init: function () {
    	
    	/*copyright*/
        var copyright=new Date();
        var update=copyright.getFullYear();
        if ($('footer #copyright #info').length){ 
        	$('footer #copyright #info').html('Copyright &copy ' + update + ', All Rights Reserved');
        }
        
        $( ".home nav.slide_bar span" ).click(function() {
		  if( parseInt($( ".home nav.slide_bar" ).css("marginRight")) !=0){
		  	$( ".home nav.slide_bar" ).animate({
			    marginRight: 0,
			  }, 500, function() {
			    // Animation complete.
			  });
		  }else{
		  	$( ".home nav.slide_bar" ).animate({
			    marginRight: "-400px",
			  }, 500, function() {
			    // Animation complete.
			  });
		  }
		});
        
        //make mapwrapper 100% 100%
		$("#map_wrapper").css("width", $(window).width());
		$("#map_wrapper").css("height", $(window).height());
		
		var map = L.map('map').setView([51.505, -0.09], 13);
		
		L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
		    maxZoom: 18,
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);
		
		
		L.marker([51.5, -0.09]).addTo(map)
		        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
		
		L.circle([51.508, -0.11], 500, {
		    color: 'red',
		    fillColor: '#f03',
		    fillOpacity: 0.5
		}).addTo(map).bindPopup("I am a circle.");
		
		L.polygon([
		    [51.509, -0.08],
		    [51.503, -0.06],
		    [51.51, -0.047]
		]).addTo(map).bindPopup("I am a polygon.");
		
		var popup = L.popup();
		
		map.on('click', Main.onMapClick);

    },
    onMapClick: function (e) {
	    popup.setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
	}
};

