$('#filter-modal').on('click', function(event) {
    if(event.target == this) {
        event.target.style.display = "none";
    }
})
$('option').hover(function() {
    $(this).css('background-color', 'dodgeblue')
})
function createCheckboxes(data, column_name, id) {
    let modal = document.querySelector(id);
    output = "<option value='default'>Default</option>"
    for(let i = 0; i < data.length; i++) {
        output += `
        <option value="${data[i][column_name]}">${data[i][column_name]}</option>
        `
    }
    modal.innerHTML = output
}

let map;
let coordinates;
let markersArr = [];
let mode = [];
let heatmap;
let radius = 1000;
let zoom = 16;

// Initialize and add the map
async function initMap() {
    // The map, centered at SF
    map = await new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        center: sf,
        styles: mode,
        minZoom: 13,
    });
    // Change to the center of map
    map.addListener("dragend", () => {
        let newCenter = map.getCenter();
        center.lat = newCenter.lat();
        center.lng = newCenter.lng();
        if (filter.length < 1) {
            filter.push({type: "incident_year", value: '2022'})
        }
        changeInFilter();
    })
    // Zoom change on the map
    map.addListener("zoom_changed", () => {
        let newZoom = map.getZoom();
        radius = radius + ((zoom - newZoom)* 500);
        zoom = newZoom;
        if (filter.length < 1) {
            filter.push({type: "incident_year", value: '2022'})
        }
        changeInFilter();
    })


    // Markers coordinates - initial setup
    // coordinates = await fetchAllCoordinates(urlAll);
    coordinates = await fetchWithinRange(urlRange)
    addMarker(coordinates);

    // Create Filter Button
    const filterControlDiv = document.createElement('div');
    controlUI = FilterButton(filterControlDiv);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(filterControlDiv);

    // Create Mode Button
    const modeControlDiv = document.createElement('div');
    controlUI = ModeButton(modeControlDiv);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(modeControlDiv);

    // Create Heatmap Button
    const heatmapControlDiv = document.createElement('div');
    controlUI = HeatMapButton(heatmapControlDiv);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(heatmapControlDiv);

    // Create checkboxes
    uniqueIncident = await fetchUnique(urlIncident);
    createCheckboxes(uniqueIncident, "incident_category", '#filter-types');
    uniqueYear = await fetchUnique(urlYear);
    createCheckboxes(uniqueYear, "incident_year", '#filter-dates');
    uniqueNeighborhoods = await fetchUnique(urlNeighborhood);
    createCheckboxes(uniqueNeighborhoods, "analysis_neighborhood", '#filter-neighborhoods');
    uniquePolice = await fetchUnique(urlPolice);
    createCheckboxes(uniquePolice, "police_district", '#filter-police');
}

window.initMap = initMap;

