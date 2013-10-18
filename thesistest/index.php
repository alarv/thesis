
<!DOCTYPE html>
<html>
    <head>
        <title>Leaflet Layers Control Example</title>
        <meta charset="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="css/leaflet.css" />
        <link rel="stylesheet" href="css/style.css" />

        <script src="js/libs/jquery-1.10.2.min.js"></script>
    </head>
    <body>
        <div id="map"></div>

        <script src="js/libs/leaflet.js"></script>

        <script type="text/javascript" src="js/libs/world-states.js"></script>
        <script type="text/javascript">
            $("#map").css("width", $(window).width());
            $("#map").css("height", $(window).height());
            var clicked = false;
            
            
//            var southWest = new L.LatLng(-60.23981, -201.79687),
//                    northEast = new L.LatLng(87.54007, 254.53125),
//                    bounds = new L.LatLngBounds(southWest, northEast);
            var map = L.map('map', {minZoom: "2"}).setView([45.8288, 5.27344], 3);

            var cloudmade = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
                key: 'BC9A493B41014CAABB98F0471D759707',
                styleId: 22677
            }).addTo(map);


            // control that shows state info on hover
//            var info = L.control();
//
//            info.onAdd = function(map) {
//                this._div = L.DomUtil.create('div', 'info');
//                this.update();
//                return this._div;
//            };

//            info.update = function(props) {
//                this._div.innerHTML = '<h4>US Population Density</h4>' + (props ?
//                        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
//                        : 'Hover over a state');
//            };

//            info.addTo(map);


            // get color depending on population density value
            function getColor(d) {
                return d > 1000 ? '#800026' :
                        d > 500 ? '#BD0026' :
                        d > 200 ? '#E31A1C' :
                        d > 100 ? '#FC4E2A' :
                        d > 50 ? '#FD8D3C' :
                        d > 20 ? '#FEB24C' :
                        d > 10 ? '#FED976' :
                        '#44B5CA';
            }

            function style(feature) {
                return {
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7,
                    fillColor: getColor(feature.properties.density)
                };
            }

            function highlightFeature(e) {
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

//                info.update(layer.feature.properties);
            }

            var geojson;

            function resetHighlight(e) {
                geojson.resetStyle(e.target);
//                info.update();
            }

            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
                console.log(e.target);
            }

            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }

            geojson = L.geoJson(statesData, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map);

            map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


//            var legend = L.control({position: 'bottomright'});
//
//            legend.onAdd = function(map) {
//
//                var div = L.DomUtil.create('div', 'info legend'),
//                        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//                        labels = [],
//                        from, to;
//
//                for (var i = 0; i < grades.length; i++) {
//                    from = grades[i];
//                    to = grades[i + 1];
//
//                    labels.push(
//                            '<i style="background:' + getColor(from + 1) + '"></i> ' +
//                            from + (to ? '&ndash;' + to : '+'));
//                }
//
//                div.innerHTML = labels.join('<br>');
//                return div;
//            };
//
//            legend.addTo(map);


            window.onresize = fixMap;
            function fixMap() {
                $("#map").css("width", $(window).width());
                $("#map").css("height", $(window).height());
            }
            $("#map").css("background","white");
        </script>
    </body>
</html>
