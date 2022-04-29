// Add all the marker to the map according to the coordinates data
function addMarker() {
    const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true
    });

    // Creating of Markers
    const markers = coordinates.map((data) => {
        date = new Date(data.incident_datetime)
        const label = `<div class="info-box">
        <p><span class="info-label">Incident Number:</span> ${data.incident_number}</p>
        <p><span class="info-label">Date:</span> ${date.toLocaleDateString()}</p>
        <p><span class="info-label">Time:</span> ${date.toLocaleTimeString('en-US')}</p>
        <p><span class="info-label">Police District:</span> ${data.police_district}</p>
        <p><span class="info-label">Category:</span> ${data.incident_category}</p>
        <p><span class="info-label">Description:</span> ${data.incident_description}</p>
        <p> ${data.resolution} </p>
        <form id="${data.incident_number}" style="display:none">
            <label class="info-label" style="display:block"> Comment: </label>
            <textarea class="noSize" name="message" placeholder="Enter comments" rows="3" cols="40"></textarea>
        </form>
            <button type="button" onclick="comment(this, ${data.incident_number})">Add Comment</button>
            <button type="button" onclick="viewComment(${data.incident_number})">View Comments</button>
        <div id="comments${data.incident_number}" style="display:none"></div>
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
// Fetch a certain report by incident number
async function fetchIncident(id) {
    url = `https://data.sfgov.org/resource/wg3w-h783.json?incident_number=${id}&$where=latitude IS NOT NULL AND longitude IS NOT NULL`;
    let response = await fetch(url);
    let data = response.json()
    console.log(data)
    return data
}

// Change to the Center or Zoom
filter = [{type: "incident_year", value: '2022'}]
async function changeInFilter() {
    url = 'https://data.sfgov.org/resource/wg3w-h783.json?$where=latitude IS NOT NULL AND longitude IS NOT NULL'
    for (let i = 0; i < filter.length; i++) {
        url += ` AND ${filter[i].type}="${filter[i].value}"` 
    }
    coordinates = await fetchWithinRange(url)
    heatID = document.querySelector('#heatmapID > div');
    if(heatID.innerHTML != "Normal Map") {
        deletesMarker()
        addMarker()
    } else {
        heatmapData = []
        heatmap.setMap(null)
        addHeatMapData()
    }
}
// Select the filters
function filterValue(select) {
    url = 'https://data.sfgov.org/resource/wg3w-h783.json?$where=latitude IS NOT NULL AND longitude IS NOT NULL'
    if(select.value != "default") {
        if (filter.filter(option => option.type == select.name ).length>0) {
            index = filter.findIndex(obj => obj.type == select.name );
            filter[index].value = select.value;
        } else {
            filter.push({type: select.name, value: select.value})
        }
    } else {
        filter = filter.filter(option => option.type != select.name )
    }
    changeInFilter();
}
// Filter the Dirstrict and move over to the neighborhood
function filterDistrict(element) {
    for(let i = 0; i < neighborhoods.length; i++) {
        if(element.value == neighborhoods[i].neighborhood) {
            center.lat = neighborhoods[i].lat;
            center.lng = neighborhoods[i].lng;
            let latLng = new google.maps.LatLng(center.lat, center.lng);
            map.panTo(latLng)
            changeInFilter();
            break;
        }
    }
}
// Filter the incident number
async function filterIncident() {
    number = document.getElementById('filter-incident-number');
    coordinates = await fetchIncident(number.value)
    center.lat = coordinates[0].latitude
    center.lng = coordinates[0].longitude
    let latLng = new google.maps.LatLng(center.lat, center.lng);
    map.panTo(latLng)
    heatID = document.querySelector('#heatmapID > div');
    if(heatID.innerHTML != "Normal Map") {
        deletesMarker()
        addMarker()
    } else {
        heatmapData = []
        heatmap.setMap(null)
        addHeatMapData()
    }
}

// Comment
function comment(element, id) {
    let form = document.getElementById(id);
    if(element.type == "button") {
        form.style.display = "block";
        element.type = 'submit';
        form.addEventListener("submit", (event) => addComment(event, form, id));
    } else if (element.type == 'submit') {
        element.setAttribute("form", (id));
    }
}
// Add comment into the database
async function addComment(e, formData, id) {
    e.preventDefault();
    let data = new FormData(formData)
    await fetch(`http://localhost:5000/process/comments/${id}`, {method:"POST", body: data})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    formData.reset();
    await viewComment(id)
}

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
async function viewComment(id) {
    let response = await fetch(`http://localhost:5000/process/comments/view/${id}`)
    let data = await response.json()

    commentDiv = document.getElementById(`comments${id}`)
    output = ""
    for (let i = data.length-1; i >= 0; i--) {
        let date = new Date(data[i].created_at).toDateString()
        let time = new Date(data[i].created_at).toLocaleTimeString()

        output += `<div class="comment">
        <p>${data[i].content}</p>
        <p style="text-align:end">${date} ${time}</p>
        </div>`
    }
    commentDiv.style.display = 'block'
    commentDiv.innerHTML = output
}