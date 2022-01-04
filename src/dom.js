const populateCurrent = (currentData, tempMode) => {
    document.querySelector('#currentTime').innerHTML = currentData.currentTime;

    document.querySelector('#description').innerHTML = currentData.description;

    const currentTemp = document.querySelector('#currentTemp');
    if (tempMode === 'F') {
        currentTemp.innerHTML = `${currentData.tempF} &deg;F`;
    } else {
        currentTemp.innerHTML = `${currentData.tempC} &deg;C`;
    }

    const feelTemp = document.querySelector('#feelTemp');
    if (tempMode === 'F') {
        feelTemp.innerHTML = `<i><b>feels like</b></i>: ${currentData.feelTempF} &deg;F`;
    } else {
        feelTemp.innerHTML = `<i><b>feels like</b></i>: ${currentData.feelTempC} &deg;C`;
    }

    document.querySelector('#chanceRain').innerHTML = `<i><b>chance of rain</b></i>: ${currentData.chanceRain}%`;
    document.querySelector('#humidity').innerHTML = `<i><b>humidity</b></i>: ${currentData.humidity}%`;
    document.querySelector('#windSpeed').innerHTML = `<i><b>wind speed</b></i>: ${currentData.windSpeed} km/h`;
}

const populateHourly = (hourlyData, tempMode) => {
    const hourlyDataContainer = document.querySelector('#hourlyDataContainer');
    hourlyDataContainer.innerHTML = '';

    for (let i = 0; i < 12; i++) {
        let hour;
        if (hourlyData[i].hour === 0) {
            hour = `12 AM`;
        } else if (hourlyData[i].hour < 12) {
            hour = `${hourlyData[i].hour} AM`;
        } else if (hourlyData[i].hour === 12) {
            hour = `12 PM`;
        } else {
            hour = `${hourlyData[i].hour - 12} PM`;
        }

        let hourContainer = document.createElement('div');
        hourContainer.id = 'hourContainer';

        let hourField = document.createElement('div');
        hourField.id = 'hourField';
        hourField.innerHTML = hour;
        hourContainer.appendChild(hourField);

        let tempField = document.createElement('div');
        if (tempMode === 'F') {
            tempField.innerHTML = `${hourlyData[i].tempF}&deg;`
        } else {
            tempField.innerHTML = `${hourlyData[i].tempC}&deg;`
        }
        hourContainer.appendChild(tempField);

        hourlyDataContainer.appendChild(hourContainer);
    }
}

const populateDaily = (dailyData, tempMode) => {
    console.log(dailyData);
    const dailyDataContainer = document.querySelector('#dailyDataContainer');
    dailyDataContainer.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        let dayContainer = document.createElement('div');
        dayContainer.id = 'dayContainer';

        let dayField = document.createElement('div');
        dayField.innerHTML = `<b>${dailyData[i].day}</b>`;
        dayContainer.appendChild(dayField);

        let hiField = document.createElement('div');
        hiField.id = 'hiField';
        let loField = document.createElement('div');
        loField.id = 'loField'

        if (tempMode === 'F') {
            hiField.innerHTML = `<b>hi</b>: ${dailyData[i].maxTempF}&deg;`;
            loField.innerHTML = `<b>lo</b>: ${dailyData[i].minTempF}&deg;`;
        } else {
            hiField.innerHTML = `<b>hi</b>: ${dailyData[i].maxTempC}&deg;`;
            loField.innerHTML = `<b>lo</b>: ${dailyData[i].minTempC}&deg;`;
        }

        dayContainer.appendChild(hiField);
        dayContainer.appendChild(loField);

        dailyDataContainer.appendChild(dayContainer);
    }
}

export {
    populateCurrent,
    populateHourly,
    populateDaily
}