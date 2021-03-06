//----BASEMAPS----//
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

//---HOME BUTTON----//

var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

//---Get Coordinates on Click--//
var c = new L.Control.Coordinates();  

c.addTo(map);

map.on('click', function(e) {
    c.setCoordinates(e);
});

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

var points = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
	layers: 'IST_Mosaic:points',
    format: 'image/png',
    transparent: true})//.addTo(map);

var sicon =  L.icon({
    iconUrl: 'start.png',
    shadowUrl: null,
    iconSize:  [40, 40],
});

// Search Bar

function filterUpdate(){  
	var info=document.getElementById("filter").value;  
	var filter = "Name=" + "'" + info + "'"
	points.setParams({CQL_FILTER:filter});
	points.addTo(map);
	console.log(info, filter)
}

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var places = ['HOD Mechanical/ Avionics Engineering', 'HOD Electrical Engineering', 'Transport Office', 'Vice Chancellor Office', 'HOD Aerospace Engineering 1st Floor', 'HOD Materials Engineering 1st Floor',
  'Student Affairs 1st Floor', 'IST Library', 'ATM Machine','Astronomy Lab','HOD Space Sciences',
  'Reproduction Cell','GREL Lab','Dean Office 1st Floor'];

$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'places',
  source: substringMatcher(places)
});

//---ROUTING FUNCTIONALITY---//

var eicon =  L.icon({
    iconUrl: 'end.png',
    shadowUrl: null,
    iconSize:  [40, 40],
});

var selectedPoint = null;

/*map.locate({setView: false, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;
    var sourceMarker = L.marker(e.latlng, {
    	icon: sicon,
    	draggable: true
    })
    .on("dragend", function(e) {
    	selectedPoint = e.target.getLatLng(); 
    	getRoute(); console.log(sourceMarker.getLatLng())
	}).addTo(map)

}

map.on('locationfound', onLocationFound);*/

var sourceMarker = L.marker([33.5183, 73.1789], {
	icon: sicon,
    draggable: true
})
.on("dragend", function(e) {
    selectedPoint = e.target.getLatLng(); 
    getRoute(); 
})
.addTo(map); 

/*function onMapClick(e) {
	var targetMarker = L.marker(e.latlng, {
		icon: eicon,
    	draggable: true
	})
	.on("dragend", function(e) {
   		selectedPoint = e.target.getLatLng(); 
    	getRoute(); 
	}).addTo(map)
}

map.on('click', onMapClick);*/

var targetMarker = L.marker([33.5191, 73.1768], {
	icon: eicon,
    draggable: true
})
.on("dragend", function(e) {
    selectedPoint = e.target.getLatLng(); 
    getRoute(); 
})
.addTo(map); 

var routing = null;
function getRoute(){
    var start = sourceMarker.getLatLng(); 
    var end = targetMarker.getLatLng();   
	var viewparams = 'y1:' + start.lat + ';' + 'x1:' + start.lng + ';' + 'y2:' + end.lat + ';' + 'x2:' + end.lng
	console.log(routing)
	if (routing == null){
			routing = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
		        layers: 'IST_Mosaic:Final_Route',
		        format: 'image/png',
			//	styles: 'simple_roads',
		        transparent: true
		    }).setParams({viewparams}, false)
		routing.addTo(map); 
	}
	else {
			map.removeLayer(routing)
			routing = L.tileLayer.wms('http://localhost:8010/geoserver/IST_Mosaic/wms' , {
		        layers: 'IST_Mosaic:Final_Route',
		        format: 'image/png',
			//	styles: 'simple_roads',
		        transparent: true
		    }).setParams({viewparams}, false)
		routing.addTo(map); 
	}
		
}


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

var dine = L.marker([33.520932, 73.174288],{icon:dining}).bindPopup("<b>IST New Mess</b>");
var dine2 = L.marker([33.519897, 73.174769],{icon:dining}).bindPopup("<b>IST Old Mess</b>");
var tuc = L.marker([33.520413, 73.175694],{icon:tucshop}).bindPopup("<b>IST Tuc Shop</b>");
var park = L.marker([33.519383, 73.177498],{icon:parking}).bindPopup("<b>Parking Shed</b>");
var host = L.marker([33.522167, 73.173225],{icon:hostel}).bindPopup("<b>Boys Hostel</b>");
var host1 = L.marker([33.519584, 73.173383],{icon:hostel}).bindPopup("<b>Girls Hostel</b>");
var host2 = L.marker([33.520262, 73.174246],{icon:hostel1}).bindPopup("<b>Faculty Hostel</b>");
var toil = L.marker([33.519708, 73.176003],{icon:toilico}).bindPopup("<b>Male and Female Restrooms</b>");
var toil1 = L.marker([33.521030, 73.176506],{icon:toilico}).bindPopup("<b>Male and Female Restrooms</b>");
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



var Food = L.layerGroup([dine, dine2, tuc]); 
var host = L.layerGroup([host, host1, host2]);
var toil = L.layerGroup([toil, toil1]);
var enter = L.layerGroup([entry, entry1, exiter, exiter1, exiter2]);
var park = L.layerGroup([parky, parky1]);
var uni = L.layerGroup([univ]);
var uni1 = L.layerGroup([univ1]);
var uni2 = L.layerGroup([univ4]);
var uni3 = L.layerGroup([univ3]);
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
  div.innerHTML += '<i style="background: #1CE7E7"></i><span>Buildings</span><br>';
  div.innerHTML += '<i style="background: #741b47"></i><span>Roads</span><br>';
  div.innerHTML += '<i style="background: #ffd966"></i><span>Grounds</span><br>';
  

  return div;
};

legend.addTo(map);


/*L.Routing.control({
  waypoints: [
    L.latLng(33.5173, 73.1779),
    L.latLng(33.5175, 73.1780)
  ]
}).addTo(map);
getRoute();*/