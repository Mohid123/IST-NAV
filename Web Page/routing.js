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
    layers: [topo]});

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

var c = new L.Control.Coordinates();  //you can send options to the constructor if you want to, otherwise default values are used

c.addTo(map);

map.on('click', function(e) {
    c.setCoordinates(e);
});

var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			//.setContent("You clicked the map at " + e.latlng.toString())  //this.getLatLng() don't work
			.setContent("Sunset at " + L.sun.sunset(e.latlng))  //this.getLatLng() don't work
			.openOn(map);
	}
	map.on('click', onMapClick);



/*
var options = { timeout: 5000 }
var box = L.control.messagebox(options).addTo(map);
var box2 = L.control.messagebox(options).addTo(map);

L.control.liveupdate ({
    update_map: function () {
        box.show( 'IST-NAV is free to use!!' );
        box2.show( 'Lost? Use the search box and get back on track' );
    },
    position: 'topleft'
})
.addTo(map)
.startUpdating();*/

//map.addControl(new L.Control.Gps());

// Loading the "Buildings" layer from geoserver. The layers have been stored and styled prior within geoserver.
var Buildings = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Buildings1',
    format: 'image/png',
    transparent: true}).addTo(map);

        // Loading the "Grounds" layer from geoserver. The layers have been stored and styled prior within geoserver
var Grounds = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Grounds',
    format: 'image/png',
    transparent: true}).addTo(map);

        // Loading the "Lawns" layer from geoserver. The layers have been stored and styled prior within geoserver.
var Lawns = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Lawns',
    format: 'image/png',
    transparent: true}).addTo(map);

        // Loading the "Line" layer from geoserver. The layers have been stored and styled prior within geoserver
var Line = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:Roads',
    format: 'image/png',
    transparent: true}).addTo(map);

var sicon =  L.icon({
    iconUrl: 'start.png',
    shadowUrl: null,
    iconSize:  [40, 40],
});

var eicon =  L.icon({
    iconUrl: 'end.png',
    shadowUrl: null,
    iconSize:  [40, 40],
});

var selectedPoint = null;

var sourceMarker = L.marker([33.5183, 73.1789], {
	icon: sicon,
    draggable: true
})
.on("dragend", function(e) {
    selectedPoint = e.target.getLatLng(); //console.log(selectedPoint)
    getRoute(); 
})
.addTo(map); 

var targetMarker = L.marker([33.5191, 73.1768], {
	icon: eicon,
    draggable: true
})
.on("dragend", function(e) {
    selectedPoint = e.target.getLatLng(); //console.log(selectedPoint)
    getRoute(); 
})
.addTo(map); 
var routing = null;
function getRoute(){
    var start = sourceMarker.getLatLng(); // console.log(start.lng)
    var end = targetMarker.getLatLng();   
	var viewparams = 'y1:' + start.lat + ';' + 'x1:' + start.lng + ';' + 'y2:' + end.lat + ';' + 'x2:' + end.lng
	console.log(routing)
	if (routing == null){
			routing = L.tileLayer.wms('http://localhost:8010/geoserver/pgRouting/wms' , {
		        layers: 'pgRouting:new_pgRouting',
		        format: 'image/png',
			//	styles: 'simple_roads',
		        transparent: true
		    }).setParams({viewparams}, false)
		routing.addTo(map); 
	}
	else {
			map.removeLayer(routing)
			routing = L.tileLayer.wms('http://localhost:8010/geoserver/pgRouting/wms' , {
		        layers: 'pgRouting:new_pgRouting',
		        format: 'image/png',
			//	styles: 'simple_roads',
		        transparent: true
		    }).setParams({viewparams}, false)
		routing.addTo(map); 
	}
		
}
/*sourceMarker.on('dragend', function (e) {
  document.getElementById('start').value = sourceMarker.getLatLng().lat;
  document.getElementById('start').value = sourceMarker.getLatLng().lng;
});

targetMarker.on('dragend', function (e) {
  document.getElementById('end').value = targetMarker.getLatLng().lat;
  document.getElementById('end').value = targetMarker.getLatLng().lng;
});
    
	//--Adding Layers to the map collectively as one variable--//
//var layer_Poly = L.layerGroup([Buildings,Grounds,Lawns]).addTo(map);
//var layer_Line = L.layerGroup([Line]).addTo(map);
//var layer_route = L.layerGroup([routing]).addTo(map);
	//var layer_traffic = L.layerGroup([googleTraffic]);
/*var overlays = {
	"Buildings":layer_Poly,
	"Roads":layer_Line,
	//"Route":layer_route,
};*/
//layer_control = L.control.layers(baseMaps, null, {position:'topleft'}).addTo(map);

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
var pulsingIcon = L.icon.pulse({iconSize:[10,10],color:'red'});
var search = L.marker([33.521500, 73.176870],{icon: pulsingIcon}); //mech hod
var search1 = L.marker([33.521500, 73.176870],{icon: pulsingIcon}); //mat hod
var search2 = L.marker([33.521518, 73.176516],{icon: pulsingIcon}); //elec hod
var search3 = L.marker([33.519560, 73.176355],{icon: pulsingIcon}); //transport office
var search4 = L.marker([33.519719, 73.175992],{icon: pulsingIcon}); //dean office 1st floor
var search5 = L.marker([33.519641, 73.175724],{icon: pulsingIcon}); //vc office 
var search6 = L.marker([33.519967, 73.175748],{icon: pulsingIcon}); //department of aero 1st floor
var search7 = L.marker([33.519683, 73.176291],{icon: pulsingIcon}); //department of avionics 1st floor
var search8 = L.marker([33.519792, 73.175625],{icon: pulsingIcon}); //student affairs 1st floor
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
var parky1 = L.marker([33.520370, 73.176456],{icon:parking1}).bindPopup("<b>Faculty/VIP Parking</b>");
var univ = L.marker([33.519892, 73.176141],{icon:blocks}).bindPopup("<b>Raza Block</b>");
var univ1 = L.marker([33.519916, 73.174969],{icon:blocks}).bindPopup("<b>Block II/ Teacher and Faculty Offices</b>");
var univ2 = L.marker([33.520921, 73.176570],{icon:blocks}).bindPopup("<b>Block VI</b>");
var univ3 = L.marker([33.520128, 73.176062],{icon:blocks}).bindPopup("<b>Block IV</b>");
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
var uni3 = L.layerGroup([univ3]);
var uni4 = L.layerGroup([univ5]);
var uni5 = L.layerGroup([univ2]);
/*var pulsar = L.layerGroup([search]);
var pulsar1 = L.layerGroup([search1]);
var pulsar2 = L.layerGroup([search2]);
var pulsar3 = L.layerGroup([search3]);
var pulsar4 = L.layerGroup([search4]);
var pulsar5 = L.layerGroup([search5]);
var pulsar6 = L.layerGroup([search6]);
var pulsar7 = L.layerGroup([search7]);
var pulsar8 = L.layerGroup([search8]);*/

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

$("#uni3").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(uni3)) {
        $(this).removeClass('selected');
        map.removeLayer(uni3);
    } else {
        map.addLayer(uni3);        
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

// Seacrh Bar

var data = [
{"loc":[33.521500, 73.176870], "title":"HOD Mechanical Engineering/ HOD Materials Engineering"},
{"loc":[33.521518, 73.176516], "title":"HOD Electrical Engineering"},
{"loc":[33.519560, 73.176355], "title":"Transport Office"},
{"loc":[33.519719, 73.175992], "title":"Dean Office (1st Floor)"},
{"loc":[33.519641, 73.175724], "title":"Vice Chancellor Office"},
{"loc":[33.519967, 73.175748], "title":"HOD Aerospace Engineering"},	
{"loc":[33.519683, 73.176291], "title":"Department of Avionics and Aerospace"},
{"loc":[33.519792, 73.175625], "title":"Student Affairs (1st Floor)"}
];

var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);

var controlSearch = new L.Control.Search({
	position:'topright',		
	layer: markersLayer,
	initial: false,
	zoom: 18,
	marker: false
});
map.addControl( controlSearch );

for(i in data) {
var title = data[i].title,	//value searched
loc = data[i].loc,		//position found
marker = new L.Marker(new L.latLng(loc), {title: title} );// property searched
marker.bindPopup(title );
markersLayer.addLayer(marker);
}


	//---------LEGEND--------//
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>LEGEND</h4>";
  div.innerHTML += '<i style="background: #6aa84f"></i><span>Lawns</span><br>';
  div.innerHTML += '<i style="background: #1CE7E7"></i><span>Buildings</span><br>';
  div.innerHTML += '<i style="background: #741b47"></i><span>Roads</span><br>';
  div.innerHTML += '<i style="background: #ffd966"></i><span>Grounds</span><br>';
  

  return div;
};

legend.addTo(map);


//L.Routing.control({
  //waypoints: [
    //L.latLng(33.5173, 73.1779),
    //L.latLng(33.5175, 73.1780)
  //]
//}).addTo(map);
//getRoute();*/