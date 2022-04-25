// The location of SF
const sf = {
    lat: 37.7772383807668,
    lng: -122.43293971229544
};

// Night mode style for map
nightMode = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
    },
    {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
    },
    {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
    },
    {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
    },
    {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
    },
    {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
    },
    {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
    },
    {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
    },
    {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
    },
    {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
    },
    {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
    },
    {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
    },
    {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
    },
    {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
    },
    {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
    },
];

// Button Style
function styleButton(title, text) {
    // add class to the control border
    const controlUI = document.createElement('div');
    controlUI.classList.add('mapButton');
    controlUI.title = title;

    // add class to the control interior
    const controlText = document.createElement('div');
    controlText.classList.add('mapButtonText');
    controlText.innerHTML = text;
    controlUI.appendChild(controlText);
    return controlUI;
}

// Create a Filter button on the map
function FilterButton(controlDiv) {
    const controlUI = styleButton("Display Filter Modal", "Filter")
    controlDiv.appendChild(controlUI);

    // addEventListener
    controlUI.addEventListener('click', ()=> {
        let modal = document.querySelector('#filter-modal')
        modal.style.display = "block"
    })
}

// Create a Mode button on the map
function ModeButton(controlDiv) {
    const controlUI = styleButton("Map Mode", "Dark Mode");
    controlDiv.appendChild(controlUI);

    // addEventListener
    controlUI.addEventListener('click', ()=> {
        controlText = controlUI.firstChild;
        if(controlUI.innerText == "Dark Mode") {
            controlText.innerHTML = "Light Mode";
            mode = nightMode;
        } else {
            controlText.innerHTML = "Dark Mode";
            mode = [];
        }
        map.setOptions({styles: mode})
        heatID = document.querySelector('#heatmapID > div');
        if(heatID.innerHTML != "Normal Map") {
            showMarker()
        }
    })
}

// Create a HeatMap button on the map
function HeatMapButton(controlDiv) {
    const controlUI = styleButton("Map Mode", "Heat Map");
    controlUI.id = "heatmapID"
    controlDiv.appendChild(controlUI);

    // addEventListener
    controlUI.addEventListener('click', ()=> {
        controlText = controlUI.firstChild;
        if(controlUI.innerText == "Heat Map") {
            controlText.innerHTML = "Normal Map";
            deletesMarker();
            addHeatMapData()
        } else {
            controlText.innerHTML = "Heat Map";
            addMarker(coordinates);
            heatmapData = []
            heatmap.setMap(null)
        }
    })
}