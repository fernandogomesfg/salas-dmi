var map = L.map('map').setView([-25.94972974, 32.59967431], 18);


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 26,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
})

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 26,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
})
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 26,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 26
}).addTo(map);

var baseMaps = {
    'Google Satelite': googleSat,
    'Google Streets': googleStreets,
    'OSM': osm
}

L.control.layers(baseMaps).addTo(map);

function onEachFeature(feature, salasDMI) {
    if (feature.properties && feature.properties.Latitude) {
        salasDMI.bindPopup(
            `
            <table>
                <tr>
                    <td ><b>Nome da Sala: </b></td>                  
                    <td></b>${feature.properties.Nome} </br></td>
                </tr>
                <tr>
                    <td><b>Departamento: </b></td> 
                    <td></b>${feature.properties.Departamento}</td>
                </tr>
                
                <tr>
                    <td><b>Faculdade:</b>
                    <td>${feature.properties.Faculdade}</td>
                </tr>
            </table>
            
            `);

    }
}

const geojsonMarkerOptions = {
    radius: 8,
    fillColor: '#ff7800',
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8

}

const markers = L.markerClusterGroup();

L.geoJSON(salasDMI, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return markers.addLayer(L.circleMarker(latlng, geojsonMarkerOptions))
    }
}).addTo(map)

// marker Cluster
map.addLayer(markers);

// Print Map
$(".print-map").click(function () {
    window.print();
})

// add browserControl to map
 L.control.browserPrint().addTo(map);
//L.control.browserPrint({ position: 'topright', title: 'Print Map', printModes: ["Landscape"] }).addTo(map);

// Control Measure
L.control.measure({
    primaryLengthUnit: 'kilometers', 
    secondaryLengthUnit: 'meters',
    primaryAreaUnit: 'sqmeters', 
    secondaryAreaUnit: undefined
}).addTo(map)