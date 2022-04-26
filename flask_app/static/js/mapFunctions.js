// Add all the marker to the map according to the coordinates data
function addMarker(coordinates) {
    const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true
    });

    // Creating of Markers
    const markers = coordinates.map((data) => {
        date = new Date(data.incident_datetime)
        const label = `<div>
        <p><span class="info-label">Incident Number:</span> ${data.incident_number}</p>
        <p><span class="info-label">Date:</span> ${date.toLocaleDateString()}</p>
        <p><span class="info-label">Time:</span> ${date.toLocaleTimeString('en-US')}</p>
        <p><span class="info-label">Police District:</span> ${data.police_district}</p>
        <p><span class="info-label">Category:</span> ${data.incident_category}</p>
        <p><span>Description:</span> ${data.incident_description}</p>
        <p> ${data.resolution} </p>
        </div>`;
        let location = new google.maps.LatLng(data.latitude, data.longitude)
        const marker = new google.maps.Marker({
            position: location,
            map:map
        });
        marker.addListener("click", () => {
            infoWindow.setContent(label);
            infoWindow.open(map, marker);
        });
        markersArr.push(marker);
    })
}
function showMarker(){
    for (let i = 0; i < markersArr.length; i++) {
        markersArr[i].setMap(map);
    }
}
function hideMarker() {
    for (let i = 0; i < markersArr.length; i++) {
        markersArr[i].setMap(null);
    }
}
function deletesMarker() {
    hideMarker()
    markersArr = []
}

// HeatMap
let heatmapData = []
function addHeatMapData() {
    for(let i = 0; i < coordinates.length; i++) {
        position = new google.maps.LatLng(coordinates[i].latitude,coordinates[i].longitude);
        heatmapData.push({"location":position, "weight": 3})
    }
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map)
}
function hideHeatMap() {
    for (let i = 0; i < heatmapData.length; i++) {
        heatmapData[i].setMap(null);
    }
}
function deletesHeatMap() {
    hideHeatMap()
    heatmapData = []
}

// // Fetch all the coordinates of reported crime
// urlAll = 'https://data.sfgov.org/resource/wg3w-h783.json?$where=latitude IS NOT NULL AND longitude IS NOT NULL AND incident_year="2022"';
// async function fetchAllCoordinates(url){
//     let response = await fetch(url);
//     let data = response.json()
//     return data
// }

// Fetch all the coordinates of reported crime
urlRange = 'https://data.sfgov.org/resource/wg3w-h783.json?$where=latitude IS NOT NULL AND longitude IS NOT NULL AND incident_year="2022"';
async function fetchWithinRange(url){
    url += ` AND within_circle(point, ${center.lat}, ${center.lng}, ${radius})&$limit=200`;
    let response = await fetch(url);
    let data = response.json()
    return data
}

// Get all the unique values in the incident_category column
urlIncident = "https://data.sfgov.org/resource/wg3w-h783.json?$select=distinct incident_category";
urlYear = "https://data.sfgov.org/resource/wg3w-h783.json?$select=distinct incident_year";
urlNeighborhood = "https://data.sfgov.org/resource/wg3w-h783.json?$select=distinct analysis_neighborhood";
urlPolice = "https://data.sfgov.org/resource/wg3w-h783.json?$select=distinct police_district";
async function fetchUnique(url) {
    let response = await fetch(url)
    let data = response.json()
    return data
}

// Select the filters
filter = []
async function filterValue(select) {
    url = 'https://data.sfgov.org/resource/wg3w-h783.json?$where=latitude IS NOT NULL AND longitude IS NOT NULL'
    if(select.value != "default") {
        if (filter.filter(option => option.type == select.name ).length>0) {
            index = filter.findIndex(obj => obj.type == select.name );
            filter[index].value = select.value;
        } else {
            filter.push({"type": select.name, "value": select.value})
        }
    } else {
        filter = filter.filter(option => option.type != select.name )
    }
    for (let i = 0; i < filter.length; i++) {
        url += ` AND ${filter[i].type}="${filter[i].value}"` 
    }
    // coordinates = await fetchAllCoordinates(url)
    coordinates = await fetchWithinRange(url)
    heatID = document.querySelector('#heatmapID > div');
    if(heatID.innerHTML != "Normal Map") {
        deletesMarker()
        addMarker(coordinates)
    } else {
        heatmapData = []
        heatmap.setMap(null)
        addHeatMapData()
    }
}

async function changeInPan() {
    url = 'https://data.sfgov.org/resource/wg3w-h783.json?$where=latitude IS NOT NULL AND longitude IS NOT NULL'
    for (let i = 0; i < filter.length; i++) {
        url += ` AND ${filter[i].type}="${filter[i].value}"` 
    }
    coordinates = await fetchWithinRange(url)
    console.log(coordinates)
    heatID = document.querySelector('#heatmapID > div');
    if(heatID.innerHTML != "Normal Map") {
        deletesMarker()
        addMarker(coordinates)
        console.log(markersArr.length)
    } else {
        heatmapData = []
        heatmap.setMap(null)
        addHeatMapData()
    }
}