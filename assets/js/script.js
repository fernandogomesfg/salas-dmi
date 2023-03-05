var map = L.map('map').setView([-25.94972974, 32.59967431], 16);


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
})

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
})
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
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

L.geoJSON(salasDMI, { onEachFeature: onEachFeature }).addTo(map)





