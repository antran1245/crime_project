// The location of SF
const sf = {
    lat: 37.7772383807668,
    lng: -122.43293971229544
};
const center = {
    lat: 37.7772383807668,
    lng: -122.43293971229544
};
neighborhoods = [
    {neighborhood:"Bayview Hunters Point", lat:37.73519213585812, lng:-122.38966264158722},
    {neighborhood: "Bernal Heights", lat:37.735288239676336, lng:-122.39071581551194}, 
    {neighborhood:"Castro/Upper Market", lat:37.762728829296314, lng:-122.43489379270635},
    {neighborhood:"Chinatown", lat:37.795180282470625, lng:-122.40647138623198},
    {neighborhood:"Excelsior", lat:37.72110584503357, lng:-122.43109902727558},
    {neighborhood:"Financial District/South Beach", lat:37.791642240931616, lng:-122.39827991670336},
    {neighborhood:"Glen Park", lat:37.740030878059606, lng:-122.43744283504216},
    {neighborhood:"Golden Gate Park", lat:37.770388739649746, lng:-122.48000697531641},
    {neighborhood:"Haight Ashbury", lat:37.76746990369579, lng:-122.44465240332974},
    {neighborhood:"Hayes Valley", lat:37.7751145429352, lng:-122.42940346756632},
    {neighborhood:"Inner Richmond", lat:37.78095164738057, lng:-122.46547565672272},
    {neighborhood:"Inner Sunset", lat:37.76023383480909, lng:-122.4671209591453},
    {neighborhood:"Japantown", lat:37.78537969854705, lng:-122.4313815756845},
    {neighborhood:"Lakeshore", lat:37.72150759778289, lng:-122.48513743916732},
    {neighborhood:"Lincoln Park", lat:37.784906513085176, lng:-122.49974803110727},
    {neighborhood:"Lone Mountain/USF", lat:37.77714638441825, lng:-122.4522717010039},
    {neighborhood:"Marina", lat:37.799801647055595, lng:-122.43622136345932},
    {neighborhood:"McLaren Park", lat:37.71862196887264, lng:-122.41846940963698},
    {neighborhood:"Mission", lat:37.760425760411714, lng:-122.41486561064292},
    {neighborhood:"Mission Bay", lat:37.770938391484414, lng:-122.39103000095615},
    {neighborhood:"Nob Hill", lat:37.79153127311432, lng:-122.41328706046811},
    {neighborhood:"Noe Valley", lat:37.7486577704451, lng:-122.43148675270167},
    {neighborhood:"North Beach", lat:37.80431441579763, lng:-122.4083132327722},
    {neighborhood:"Oceanview/Merced/Ingleside", lat:37.71650058206067, lng:-122.46255262075974},
    {neighborhood:"Outer Mission", lat:37.723371750186075, lng:-122.4416579297279},
    {neighborhood:"Outer Richmond", lat:37.77615548659749, lng:-122.49442652914956},
    {neighborhood:"Pacific Heights", lat:37.789941543086975, lng:-122.43223794385963},
    {neighborhood:"Portola", lat:37.72804806926893, lng:-122.40748558522506},
    {neighborhood:"Potrero Hill", lat:37.75937552078203, lng:-122.39334645857076},
    {neighborhood:"Presidio", lat:37.79968819846817, lng:-122.46724393708774},
    {neighborhood:"Presidio Heights", lat:37.78659163781782, lng:-122.45209695716294},
    {neighborhood:"Russian Hill", lat:37.801978306833554, lng:-122.41957314870496},
    {neighborhood:"Seacliff", lat:37.786534496729054, lng:-122.48987750328246},
    {neighborhood:"South of Market", lat:37.7798258839012, lng:-122.40710389806092},
    {neighborhood:"Sunset/Parkside", lat: 37.75091416683029, lng:-122.49502734374548},
    {neighborhood:"Tenderloin", lat:37.784627933526174, lng:-122.41439971978754},
    {neighborhood:"Treasure Island", lat:37.82278290597973, lng:-122.36873588908489},
    {neighborhood:"Twin Peaks", lat:37.753276194440076, lng:-122.44958112690139},
    {neighborhood:"Visitacion Valley", lat:37.71169841993494, lng:-122.40850899995965},
    {neighborhood:"Western Addition", lat:37.78160559383103, lng:-122.43066701779972},
    {neighborhood:"West of Twin Peaks", lat:37.73393531645052, lng:-122.45923106954484},
];
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