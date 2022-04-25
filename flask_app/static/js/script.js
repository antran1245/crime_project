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
let markersArr = []
let mode = []
let heatmap;

// Initialize and add the map
async function initMap() {
    // The map, centered at SF
    map = await new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: sf,
        styles: mode,
    });
    
    // Markers coordinates
    coordinates = await fetchAllCoordinates(urlAll);
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
}

window.initMap = initMap;

