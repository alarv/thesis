var Map = {
    map:null,
    path:null,
    g:null,
    centered:null,
    width:$(window).width(),
	height:$(window).width(),
    Init: function() {
    	
    	//make mapwrapper 100% 100%
        $("#map_wrapper #map").css("width", $(window).width());
        $("#map_wrapper #map").css("height", $(window).height());
        window.onresize = Map.fixMap;

		// var southWest = new L.LatLng(-60.23981, -201.79687),
		// northEast = new L.LatLng(87.54007, 254.53125),
		// bounds = new L.LatLngBounds(southWest, northEast);
        Map.map = L.map('map', {minZoom: "2"}).setView([45.8288, 5.27344], 3);
        
       var cloudmade  = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
            key: '3c7bcb3ae149402480c8ad65ebd50285',
            styleId: 111555
        }).addTo(Map.map);
        
		var projection = d3.geo.mercator()
		    .translate([Map.width / 2, Map.height / 2]);
		
		Map.path = d3.geo.path()
		    .projection(projection);
		
		var svg = d3.select("body").append("svg")
		    .attr("width", Map.width)
		    .attr("height", Map.height);
		
		svg.append("rect")
		    .attr("class", "background")
		    .attr("width", Map.width)
		    .attr("height", Map.height)
		    .on("click", Map.Clicked);
		
		Map.g = svg.append("g");

		d3.json("js/world-50m.json", function(error, us) {
		  Map.g.append("g")
		      .attr("id", "states")
		    .selectAll("path")
		      .data(topojson.feature(us, us.objects.countries).features)
		    .enter().append("path")
		      .attr("d", Map.path)
		      .on("click", Map.Clicked);
		
		  Map.g.append("path")
		      .datum(topojson.mesh(us, us.objects.countries, function(a, b) { return a !== b; }))
		      .attr("id", "state-borders")
		      .attr("d", Map.path);
		});
    },
    Clicked: function(d) {
	  var x, y, k;
	  if (d && Map.centered !== d) {
	    var centroid = Map.path.centroid(d);
	    x = centroid[0];
	    y = centroid[1];
	    k = 4;
	    Map.centered = d;
	  } else {
	    x = Map.width / 2;
	    y = Map.height / 2;
	    k = 1;
	    Map.centered = null;
	  }
	  
	  Map.g.selectAll("path")
	  .classed("active", Map.centered && function(d) { return d === Map.centered; });
	  
	  Map.g.transition()
      .duration(750)
      .attr("transform", "translate(" + Map.width / 2 + "," + Map.height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
  	  .style("stroke-width", 1.5 / k + "px");
	},
    FixMap: function() {
        $("#map").css("width", $(window).width());
        $("#map").css("height", $(window).height());
    },
    // get color depending on population density value
    GetColor: function(d) {
        return d > 1000 ? '#800026' :
                d > 500 ? '#BD0026' :
                d > 200 ? '#E31A1C' :
                d > 100 ? '#FC4E2A' :
                d > 50 ? '#FD8D3C' :
                d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' :
                '#44B5CA';
    },
    Style: function(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: Map.GetColor(feature.properties.density)
        };
    },
    HighlightFeature: function(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 3,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

		//info.update(layer.feature.properties);
    },
    ResetHighlight: function(e) {
        Map.geojson.resetStyle(e.target);
		//info.update();
    },
    ZoomToFeature: function(e) {
        Map.map.fitBounds(e.target.getBounds());
        console.log(e.target);
    },
    OnEachFeature: function(feature, layer) {
        layer.on({
            mouseover: Map.HighlightFeature,
            mouseout: Map.ResetHighlight,
            click: Map.ZoomToFeature
        });
    }
};