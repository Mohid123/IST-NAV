var grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png'),
dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png'),
opentop = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{attribution:
	'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}), 
topo = L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=hraKUEXo01PIqJfiVq1A',{attribution:
	 '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'});
	   // Loading the basemaps and setting names or variables for them

var map = L.map('mapid', {
	center: [33.5205, 73.1769],
	zoom: 17,
    layers: [topo]});

var baseMaps = {
	"Grayscale": grayscale,
	"Dark": dark,
	"Open-Topographic": opentop,
	"Topographic": topo
};

var sourceMarker = L.marker([33.5191, 73.1768], {draggable: true})
.on("dragend", function(e) {
	selectedPoint = e.target.getLatLng();
	getVertex(selectedPoint);
	getRoute();
}).addTo(map);

var targetMarker = L.marker([33.5207, 73.1738], {draggable: true})
.on("dragend", function(e) {
		selectedPoint = e.target.getLatLng();
		getVertex(selectedPoint);
		getRoute();
	}).addTo(map);


	 //var buffer = L.circle([33.519484, 73.177532], {radius: 200}).addTo(map);


	 	// Loading the "Buildings" layer from geoserver. The layers have been stored and styled prior within geoserver.
var Buildings = L.tileLayer.wms('http://localhost:8010/geoserver/wms' , {
	layers: 'IST_Mosaic:Buildings',
    format: 'image/png',
    transparent: true});
        //Buildings.addTo(map);

        // Loading the "Grounds" layer from geoserver. The layers have been stored and styled prior within geoserver
var Grounds = L.tileLayer.wms('http://localhost:8010/geoserver/wms' , {
	layers: 'IST_Mosaic:Grounds',
    format: 'image/png',
    transparent: true});
        //Grounds.addTo(map);

        // Loading the "Lawns" layer from geoserver. The layers have been stored and styled prior within geoserver.
var Lawns = L.tileLayer.wms('http://localhost:8010/geoserver/wms' , {
	layers: 'IST_Mosaic:Lawns',
    format: 'image/png',
    transparent: true});
        //Lawns.addTo(map);

        // Loading the "Line" layer from geoserver. The layers have been stored and styled prior within geoserver
var Line = L.tileLayer.wms('http://localhost:8010/geoserver/wms' , {
	layers: 'IST_Mosaic:Roads',
    format: 'image/png',
    transparent: true});
        //Line.addTo(map);

        // Loading the "Trees" layer from geoserver. The layers have been stored and styled prior within geoserver
var Trees = L.tileLayer.wms('http://localhost:8010/geoserver/wms' , {
	layers: 'IST_Mosaic:Trees',
    format: 'image/png', 
    transparent: true});
        //Trees.addTo(map);

        // Loading the "Pedestrian_Path" layer from geoserver. The layers have been stored and styled prior within geoserver
var Pedestrian_Path = L.tileLayer.wms('http://localhost:8010/geoserver/wms' , {
    layers: 'IST_Mosaic:Pedestrian_Path',
    format: 'image/png',
    transparent: true});
        //Pedestrian_Path.addTo(map);

        //var pgRouting = L.tileLayer.wms('http://localhost:8010/geoserver/wms' , {
        //layers: 'IST_Mosaic:roads_noded_vertices_pgr',
        //format: 'image/png',
        //transparent: true});


    
	//--Adding Layers to the map collectively as one variable--//
var layer_Poly = L.layerGroup([Buildings,Grounds,Lawns]).addTo(map);
var layer_Line = L.layerGroup([Line,Pedestrian_Path]).addTo(map);
	//var layer_route = L.layerGroup([pgRouting]).addTo(map);
	//var layer_traffic = L.layerGroup([googleTraffic]);
var overlays = {
	"Polygons":layer_Poly,
	"Roads":layer_Line,
	//"Route":layer_route,
};
layer_control = L.control.layers(baseMaps,overlays, {position:'topleft'}).addTo(map);

	//--Adding ICONS to the map to highlight some important locations--//

	// Specifying what image appears on the map as the icon.
var library = L.icon({
	iconUrl:'lib.png',
	shadowUrl:null,
	iconSize: [35, 35]
});
var dining = L.icon({
	iconUrl:'dining.png',
	shadowUrl:null,
	iconSize: [28, 28]
});
var tucshop = L.icon({
	iconUrl:'teacup.png',
	shadowUrl:null,
	iconSize: [40, 40]
});
var parking = L.icon({
	iconUrl:'parking.png',
	shadowUrl:null,
	iconSize: [28, 28]
});
var hostel = L.icon({
	iconUrl:'hostel.png',
	shadowUrl:null,
	iconSize: [28, 28 ]
});
	//The markers act as the icons once they have been styled appropriately
L.marker([33.520001, 73.175823],{icon:library}).addTo(map).bindPopup("<b>IST Library</b>");
L.marker([33.520932, 73.174288],{icon:dining}).addTo(map).bindPopup("<b>IST New Mess</b>");
L.marker([33.520413, 73.175694],{icon:tucshop}).addTo(map).bindPopup("<b>IST Tuc Shop</b>");
L.marker([33.519383, 73.177498],{icon:parking}).addTo(map).bindPopup("<b>Parking Shed</b>");
L.marker([33.522167, 73.173225],{icon:hostel}).addTo(map).bindPopup("<b>Boys Hostel</b>");
L.control.scale().addTo(map);

	//---------LEGEND--------//
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>LEGEND</h4>";
  div.innerHTML += '<i style="background: #6aa84f"></i><span>Lawns</span><br>';
  div.innerHTML += '<i style="background: #45818e"></i><span>Buildings</span><br>';
  div.innerHTML += '<i style="background: #741b47"></i><span>Roads</span><br>';
  div.innerHTML += '<i style="background: #ffd966"></i><span>Grounds</span><br>';
  div.innerHTML += '<i style="background: #bf9000"></i><span>Pedestrian Routes</span><br>';
  

  return div;
};

legend.addTo(map);


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge && !L.Browser.chrome) {
        layer.bringToFront();
    }
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
