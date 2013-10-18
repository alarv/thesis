var Map = {
    bounds:null,
    map:null,
    svg:null,
    feature:null,
    Init: function() {
        Map.map = new L.Map("map", {
            center: [37.8, -96.9],
            zoom: 4
        }).addLayer(new L.TileLayer("http://{s}.tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/998/256/{z}/{x}/{y}.png"));
        Map.svg = d3.select(Map.map.getPanes().overlayPane).append("Map.svg"),
                g = Map.svg.append("g").attr("class", "leaflet-zoom-hide");
        d3.json("tiles/us-states.json", function(collection) {
            Map.bounds = d3.geo.bounds(collection),
                    path = d3.geo.path().projection(Map.project);
            Map.feature = g.selectAll("path")
                    .data(collection.features)
                    .enter().append("path");
            Map.map.on("viewreset", Map.reset);
            Map.reset();



        });
    },
    // Use Leaflet to implement a D3 geographic projection.
    project: function(x) {
        var point = Map.map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
        return [point.x, point.y];
    },
    // Reposition the SVG to cover the Map.features.
    reset: function() {
        var bottomLeft = Map.project(Map.bounds[0]),
                topRight = Map.project(Map.bounds[1]);
        Map.svg.attr("width", topRight[0] - bottomLeft[0])
                .attr("height", bottomLeft[1] - topRight[1])
                .style("margin-left", bottomLeft[0] + "px")
                .style("margin-top", topRight[1] + "px");
        g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");
        Map.feature.attr("d", path);
    }

};