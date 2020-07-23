var grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png'),
dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png'),
//OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
cycle = L.tileLayer('https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',{attribution:
	'<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
topo = L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=hraKUEXo01PIqJfiVq1A',{attribution:
	 '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'});
	   // Loading the basemaps and setting names or variables for them

var map = L.map('mapid', {
	center: [33.5205, 73.1769],
	zoom: 17,
    fullscreenControl: true,
    zoomControl: false,
	//minZoom: 16,
	//maxZoom: 20,
    layers: [dark]});

var baseMaps = {
	"Light": grayscale,
	"Dark": dark,
    //"OSM": OSM,
	"Cycle-OSM": cycle,
	"Topographic": topo
};

var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);
//map.addControl(new L.Control.Fullscreen());
//var buffer = L.circle([33.519484, 73.177532], {radius: 200}).addTo(map);


	 	// Loading the "Buildings" layer from geoserver. The layers have been stored and styled prior within geoserver.
var Buildings = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Buildings1',
    format: 'image/png',
    transparent: true});
        //Buildings.addTo(map);

        // Loading the "Grounds" layer from geoserver. The layers have been stored and styled prior within geoserver
var Grounds = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Grounds',
    format: 'image/png',
    transparent: true});
        //Grounds.addTo(map);

        // Loading the "Lawns" layer from geoserver. The layers have been stored and styled prior within geoserver.
var Lawns = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Lawns',
    format: 'image/png',
    transparent: true});
        //Lawns.addTo(map);

        // Loading the "Line" layer from geoserver. The layers have been stored and styled prior within geoserver
var Line = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Roads',
    format: 'image/png',
    transparent: true}); 
        //Line.addTo(map);

        // Loading the "Trees" layer from geoserver. The layers have been stored and styled prior within geoserver
var Trees = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Trees',
    format: 'image/png', 
    transparent: true}); 
        //Trees.addTo(map);

        // Loading the "Pedestrian_Path" layer from geoserver. The layers have been stored and styled prior within geoserver
var Pedestrian_Path = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
    layers: 'IST_Mosaic:Pedestrian_Path',
    format: 'image/png',
    transparent: true});
        //Pedestrian_Path.addTo(map);      

    
	//--Adding Layers to the map collectively as one variable--//
var layer_Poly = L.layerGroup([Buildings,Grounds,Lawns]).addTo(map);
var layer_Line = L.layerGroup([Line,Pedestrian_Path]).addTo(map);
//var layer_route = L.layerGroup([routing]).addTo(map);
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
	iconSize: [40, 40]
});
var blocks = L.icon({
    iconUrl:'campus.png',
    shadowUrl:null,
    iconSize: [34, 34]
});
var lab = L.icon({
    iconUrl:'lab.png',
    shadowUrl:null,
    iconSize: [40, 40]
});
var lab1 = L.icon({
    iconUrl:'vision.png',
    shadowUrl:null,
    iconSize: [40, 40]
});
var lab2 = L.icon({
    iconUrl:'engine.png',
    shadowUrl:null,
    iconSize: [40, 40]
});
var lab3 = L.icon({
    iconUrl:'chemistry.png',
    shadowUrl:null,
    iconSize: [40, 40]
});
var dining = L.icon({
	iconUrl:'fork.png',
	shadowUrl:null,
	iconSize: [34, 34]
});
var tucshop = L.icon({
	iconUrl:'teacup.png',
	shadowUrl:null,
	iconSize: [34, 34]
});
var parking = L.icon({
	iconUrl:'parking.png',
	shadowUrl:null,
	iconSize: [35, 35]
});
var parking1 = L.icon({
    iconUrl:'parking1.png',
    shadowUrl:null,
    iconSize: [40, 40]
});
var hostel = L.icon({
	iconUrl:'hostel.png',
	shadowUrl:null,
	iconSize: [34, 34]
});
var hostel1 = L.icon({
    iconUrl:'bed.png',
    shadowUrl:null,
    iconSize: [34, 34]
});
var atmico = L.icon({
    iconUrl:'atm.png',
    shadowUrl:null,
    iconSize: [38, 38]
});
var repico = L.icon({
    iconUrl:'copier.png',
    shadowUrl:null,
    iconSize: [36, 36]
});
var toilico = L.icon({
    iconUrl:'toilet.png',
    shadowUrl: null,
    iconSize: [30, 30]
});
var entrance = L.icon({
    iconUrl:'door.png',
    shadowUrl: null,
    iconSize: [30, 30]
});
var exit = L.icon({
    iconUrl:'exit.png',
    shadowUrl: null,
    iconSize: [30, 30]
});
	//The markers act as the icons once they have been styled appropriately
var libr = L.marker([33.520001, 73.175823],{icon:library}).bindPopup("<b>IST Library</b>");
var dine = L.marker([33.520932, 73.174288],{icon:dining}).bindPopup("<b>IST New Mess</b>");
var dine2 = L.marker([33.519897, 73.174769],{icon:dining}).bindPopup("<b>IST Old Mess</b>");
var tuc = L.marker([33.520413, 73.175694],{icon:tucshop}).bindPopup("<b>IST Tuc Shop</b>");
var park = L.marker([33.519383, 73.177498],{icon:parking}).bindPopup("<b>Parking Shed</b>");
var host = L.marker([33.522167, 73.173225],{icon:hostel}).bindPopup("<b>Boys Hostel</b>");
var host1 = L.marker([33.519584, 73.173383],{icon:hostel}).bindPopup("<b>Girls Hostel</b>");
var host2 = L.marker([33.520262, 73.174246],{icon:hostel1}).bindPopup("<b>Faculty Hostel</b>");
var atm = L.marker([33.519031, 73.177027],{icon:atmico}).bindPopup("<b>ATM Machine</b>");
var rep = L.marker([33.520824, 73.175959],{icon:repico}).bindPopup("<b>Stationary and Printing</b>");
var toil = L.marker([33.519708, 73.176003],{icon:toilico}).bindPopup("<b>Male and Female Restrooms</b>");
var toil1 = L.marker([33.521030, 73.176506],{icon:toilico}).bindPopup("<b>Male and Female Restrooms</b>");
var labr = L.marker([33.519954, 73.175729],{icon:lab}).bindPopup("<b>GREL Lab</b>");
var labr1 = L.marker([33.519631, 73.175657],{icon:lab1}).bindPopup("<b>Astronomy Lab</b>");
var labr2 = L.marker([33.522753, 73.176601],{icon:lab2}).bindPopup("<b>Mechanical Engineering Labs</b>");
var labr3 = L.marker([33.520121, 73.176081],{icon:lab3}).bindPopup("<b>Materials Engineering Labs</b>");
var entry = L.marker([33.519834, 73.176474],{icon:entrance}).bindPopup("<b>Raza Block Entrance</b>");
var entry1 = L.marker([33.520709, 73.176548],{icon:entrance}).bindPopup("<b>Block VI Entrance</b>");
var exiter = L.marker([33.519859, 73.175617],{icon:exit}).bindPopup("<b>Exit Raza Block</b>");
var exiter1 = L.marker([33.521116, 73.176718],{icon:exit}).bindPopup("<b>Exit Block VI</b>");
var exiter2 = L.marker([33.521543, 73.176914],{icon:exit}).bindPopup("<b>Exit Block VI</b>");
var parky = L.marker([33.519422, 73.177501],{icon:parking}).bindPopup("<b>Student/Visitor Parking Sheds</b>");
var parky1 = L.marker([33.519520, 73.176843],{icon:parking1}).bindPopup("<b>Faculty/VIP Parking</b>");
var univ = L.marker([33.519892, 73.176141],{icon:blocks}).bindPopup("<b>Raza Block</b>");
var univ1 = L.marker([33.519916, 73.174969],{icon:blocks}).bindPopup("<b>Block II/ Teacher and Faculty Offices</b>");
var univ2 = L.marker([33.520921, 73.176570],{icon:blocks}).bindPopup("<b>Block VI</b>");
//var univ3 = L.marker([],{icon:blocks}).bindPopup("<b>Block IV</b>");
var univ4 = L.marker([33.520438, 73.175295],{icon:blocks}).bindPopup("<b>Block III</b>");
var univ5 = L.marker([33.519741, 73.177149],{icon:blocks}).bindPopup("<b>Block V</b>");
//L.control.scale().addTo(map);

var Food = L.layerGroup([dine, dine2, tuc]); 
var host = L.layerGroup([host, host1, host2]);
var atmac = L.layerGroup([atm]);
var repac = L.layerGroup([rep]);
var toil = L.layerGroup([toil, toil1]);
var lib = L.layerGroup([libr]);
var lab = L.layerGroup([labr, labr1, labr2, labr3]);
var enter = L.layerGroup([entry, entry1, exiter, exiter1, exiter2]);
var park = L.layerGroup([parky, parky1]);
var uni = L.layerGroup([univ]);
var uni1 = L.layerGroup([univ1]);
var uni2 = L.layerGroup([univ4]);
//var uni3 = L.layerGroup([univ4]);
var uni4 = L.layerGroup([univ5]);
var uni5 = L.layerGroup([univ2]);



$("#Food").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(Food)) {
        $(this).removeClass('selected');
        map.removeLayer(Food);
    } else {
        map.addLayer(Food);        
        $(this).addClass('selected');
   }
});

$("#uni").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(uni)) {
        $(this).removeClass('selected');
        map.removeLayer(uni);
    } else {
        map.addLayer(uni);        
        $(this).addClass('selected');
   }
});

$("#uni1").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(uni1)) {
        $(this).removeClass('selected');
        map.removeLayer(uni1);
    } else {
        map.addLayer(uni1);        
        $(this).addClass('selected');
   }
});

$("#uni2").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(uni2)) {
        $(this).removeClass('selected');
        map.removeLayer(uni2);
    } else {
        map.addLayer(uni2);        
        $(this).addClass('selected');
   }
});

$("#uni4").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(uni4)) {
        $(this).removeClass('selected');
        map.removeLayer(uni4);
    } else {
        map.addLayer(uni4);        
        $(this).addClass('selected');
   }
});

$("#uni5").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(uni5)) {
        $(this).removeClass('selected');
        map.removeLayer(uni5);
    } else {
        map.addLayer(uni5);        
        $(this).addClass('selected');
   }
});

$("#park").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(park)) {
        $(this).removeClass('selected');
        map.removeLayer(park);
    } else {
        map.addLayer(park);        
        $(this).addClass('selected');
   }
});

$("#enter").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(enter)) {
        $(this).removeClass('selected');
        map.removeLayer(enter);
    } else {
        map.addLayer(enter);        
        $(this).addClass('selected');
   }
});

$("#lib").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(lib)) {
        $(this).removeClass('selected');
        map.removeLayer(lib);
    } else {
        map.addLayer(lib);        
        $(this).addClass('selected');
   }
});

$("#lab").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(lab)) {
        $(this).removeClass('selected');
        map.removeLayer(lab);
    } else {
        map.addLayer(lab);        
        $(this).addClass('selected');
   }
});

$("#host").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(host)) {
        $(this).removeClass('selected');
        map.removeLayer(host);
    } else {
        map.addLayer(host);        
        $(this).addClass('selected');
   }
});

$("#atm").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(atm)) {
        $(this).removeClass('selected');
        map.removeLayer(atm);
    } else {
        map.addLayer(atm);        
        $(this).addClass('selected');
   }
});

$("#rep").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(rep)) {
        $(this).removeClass('selected');
        map.removeLayer(rep);
    } else {
        map.addLayer(rep);        
        $(this).addClass('selected');
   }
});

$("#toil").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(toil)) {
        $(this).removeClass('selected');
        map.removeLayer(toil);
    } else {
        map.addLayer(toil);        
        $(this).addClass('selected');
   }
});
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

//L.Routing.control({
  //waypoints: [
    //L.latLng(33.5173, 73.1779),
    //L.latLng(33.5175, 73.1780)
  //]
//}).addTo(map);

//var rootURL = 'http://localhost:8010/geoserver/IST_Mosaic/wms';
//var defaultParameters = {
    //service: 'WFS',
    //version: '1.0',
   // request: 'GetFeature',
    //typeName: 'IST_Mosaic:pgRouting',
    //outputFormat: 'json',
    //format_options: 'callback:getJson',
    //SrsName: 'EPSG:4326'
//};
var selectedPoint = null;

var sourceMarker = L.marker([33.5183, 73.1789], {
    draggable: true
})
.on("dragend", function(e) {
    selectedPoint = e.target.getLatLng(); //console.log(selectedPoint)
    getRoute(); 
})
.addTo(map); 

// draggbale marker for destination point.Note the marker is initialized with an initial destination positon
var targetMarker = L.marker([33.518373, 73.177890], {
    draggable: true
})
.on("dragend", function(e) {
    selectedPoint = e.target.getLatLng(); //console.log(selectedPoint)
    getRoute(); 
})
.addTo(map); 

function getRoute(){
    var start = sourceMarker.getLatLng();  //console.log(start)
    var end = targetMarker.getLatLng();   
    var viewparams = 'y1:' + start.lat + ';' + 'x1:' + start.lng + ';' + 'y2:' + end.lat + ';' + 'x2:' + end.lng
      var routing = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
        layers: 'IST_Mosaic:pgRouting',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        viewparams: viewparams
    });
    routing.addTo(map); console.log(routing)
}
getRoute();
