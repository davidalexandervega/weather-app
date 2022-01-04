import * as actions from './actions.js';
import * as helpers from './helpers.js'
import * as dom from './dom.js'

// API KEY REQUIRED IN './actions.js' IN ORDER TO USE.

let tempMode = 'F';
let lastSearch = '';

const searchField = document.querySelector('#searchField');
document.querySelector('#searchButton').addEventListener('click', () => {
    execute(searchField.value);
});

const tempModeButton = document.querySelector('#tempMode');
tempModeButton.addEventListener('click', () => {
    if (tempMode === 'F') {
        tempMode = 'C';
        tempModeButton.innerHTML = 'switch to &deg;F';
    } else {
        tempMode = 'F';
        tempModeButton.innerHTML = 'switch to &deg;C';
    }
    execute(lastSearch);
})


///////////////////////////////////////////////////////////////////

const apiCall = async (location) => {
    let coords = await actions.fetchCoords(location);
    let [lat, lon] = coords;
    let rawData = await actions.fetchWeather(lat, lon);
    return rawData;
}

const interpret = (rawData) => {
    let currentData = helpers.parseCurrent(rawData);
    let hourlyData = helpers.parseHourly(rawData);
    let dailyData = helpers.parseDaily(rawData);
    let parsedData = [currentData, hourlyData, dailyData];
    return parsedData;
}

const populate = (parsedData, tempMode) => {
    let [currentData, hourlyData, dailyData] = parsedData;
    dom.populateCurrent(currentData, tempMode);
    dom.populateHourly(hourlyData, tempMode);
    dom.populateDaily(dailyData, tempMode);
}

///////////////////////////////////////////////////////////////////

const execute = async (location) => {
    let rawData = await apiCall(location);
    document.querySelector('#bannerTitle').innerHTML = location;
    let parsedData = interpret(rawData);
    console.log(parsedData);
    populate(parsedData, tempMode);

    lastSearch = location;
};

execute('portland');