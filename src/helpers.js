const convertTemp = (temp) => {
    let tempC = temp - 273.15;
    let tempF = (tempC * 9 / 5) + 32;
    tempC = Math.round((tempC * 10) / 10);
    tempF = Math.round((tempF * 10) / 10);
    let temps =  [tempC, tempF];
    return temps;
}

function convertTime(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let day = days[a.getDay()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();

    // keeping to double digits for consistency:
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }

    let time = day + ' ' + month + ' ' + date + ' ' + year + ' ' + hour + ':' + min;

    let timeObj = {
        time,
        day,
        hour
    }

    return timeObj;
  }

const parseCurrent = (rawData) => {
    let raw = rawData.current;
    let timeObj = convertTime(raw.dt);
    let description = raw.weather[0].description;

    let temps = convertTemp(raw.temp);
    let [tempC, tempF] = temps;

    let feelTemps = convertTemp(raw.feels_like);
    let [feelTempC, feelTempF] = feelTemps;

    let chanceRain;

    // if the percent chance is 0 it returns undefined, so:
    if (raw.rain) {
        chanceRain = Math.round((raw.rain["1h"] * 10 ) / 10);
    } else {
        chanceRain = 0;
    }

    let humidity  = raw.humidity;
    let windSpeed = raw.wind_speed;

    let currentData = {
        currentTime: timeObj.time,
        description,
        tempC,
        tempF,
        feelTempC,
        feelTempF,
        chanceRain,
        humidity,
        windSpeed
    }

    return currentData;
}

const parseHourly = (rawData) => {
    let raw = rawData.hourly;
    let hourlyData = [];

    for (let i = 0; i < 12; i++) {
        let timeObj = convertTime(raw[i].dt);
        
        let temps = convertTemp(raw[i].temp);
        let [tempC, tempF] = temps;
        let hourObj = {
            hour: Number(timeObj.hour),
            tempC,
            tempF
        }
        hourlyData.push(hourObj);
    }
    return hourlyData;
}

const parseDaily = (rawData) => {
    let raw = rawData.daily;
    let dailyData = [];

    // iterating over each day of the week and
    // pushing each returned obj into the array:
    for (let i = 0; i < 7; i++) {
        let timeObj = convertTime(raw[i].dt);
        let minTemps = convertTemp(raw[i].temp.min);
        let [minTempC, minTempF] = minTemps;
        let maxTemps = convertTemp(raw[i].temp.max);
        let [maxTempC, maxTempF] = maxTemps;

        let dayObj = {
            time: timeObj.time,
            day: timeObj.day,
            minTempC,
            minTempF,
            maxTempC,
            maxTempF
        }
        dailyData.push(dayObj);
    }
    return dailyData;
}

export {
    convertTemp,
    convertTime,
    parseCurrent,
    parseHourly,
    parseDaily
}