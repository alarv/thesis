var Main = {
    Init: function() {

        /*copyright*/
        var copyright = new Date();
        var update = copyright.getFullYear();
        if ($('footer #copyright #info').length) {
            $('footer #copyright #info').html('Copyright &copy ' + update + ', All Rights Reserved');
        }

        $(".home section.slide_bar span").click(function() {
            if (parseInt($(".home section.slide_bar").css("marginRight")) != 0) {
                $(".home section.slide_bar").animate({
                    marginRight: 0,
                }, 500, function() {
// Animation complete.
                });
            } else {
                $(".home section.slide_bar").animate({
                    marginRight: "-350px",
                }, 500, function() {
// Animation complete.
                });
            }
        });
        //make mapwrapper 100% 100%
        $("#map_wrapper").css("width", $(window).width());
        $("#map_wrapper").css("height", $(window).height());
        Map.Init();
//
//
//        L.marker([51.5, -0.09]).addTo(map)
//                .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
//
//        L.circle([51.508, -0.11], 500, {
//            color: 'red',
//            fillColor: '#f03',
//            fillOpacity: 0.5
//        }).addTo(map).bindPopup("I am a circle.");
//
//        L.polygon([
//            [51.509, -0.08],
//            [51.503, -0.06],
//            [51.51, -0.047]
//        ]).addTo(map).bindPopup("I am a polygon.");
//
//
//        var geojson;
// ... our listeners
//        geojson = L.geoJson(...);
//                map.on('click', Main.onMapClick);

    },
    onMapClick: function(e) {
        popup.setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
    }
};
//function highlightFeature(e) {
//    var layer = e.target;
//    layer.setStyle({
//        weight: 5,
//        color: '#666',
//        dashArray: '',
//        fillOpacity: 0.7
//    });
//    if (!L.Browser.ie && !L.Browser.opera) {
//        layer.bringToFront();
//    }
//}
//
//function resetHighlight(e) {
//    geojson.resetStyle(e.target);
//}

