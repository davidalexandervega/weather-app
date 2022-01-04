const apiKey = '';

const fetchCoords = async (location) => {
    try {
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`,{ mode: 'cors' });
    let data = await response.json();
    let coords = [data[0].lat, data[0].lon];
    return coords;

    } catch (error) {
        console.log(error);
    }
}

const fetchWeather = async (lat, lon) => {
    // utilizing Promise.all() so that if the application is expanded
    // to require more than one call, the syntax is already here.
    const urls = [`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`];
    try {
    // we utilize the .map() method here since we start with single elements
    // but end with an array in the place of each element after iteration:
    let responses = await Promise.all(urls.map(url => fetch(url,{ mode: 'cors' })));
    let data = await Promise.all(responses.map(response => response.json()));
    return data[0];

    } catch (error) {
        console.log(error);
    }
}

export {
    fetchCoords,
    fetchWeather,
}