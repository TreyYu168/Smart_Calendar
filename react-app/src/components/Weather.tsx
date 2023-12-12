import {useEffect, useState} from "react";
import {fetchWeatherApi} from "openmeteo";
import cloudIcon from "../assets/icons/02n.png"

const params = {
    "latitude" : 39.5539,
    "longitude": -104.9694,
    "current": ["temperature_2m", "weather_code"],
    "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    "temperature_unit": "fahrenheit",
    "wind_speed_unit": "mph",
    "precipitation_unit": "inch",
    "timezone": "America/Denver"
}

const url = "https://api.open-meteo.com/v1/gfs";
const responses = await fetchWeatherApi(url, params);
const response = responses[0]

function processWeatherData() {
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;

    return {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature: Math.trunc(current.variables(0)!.value()),
            weatherCode: current.variables(1)!.value()
        }
    }
}

const current = processWeatherData()
const Weather = () => {
    const [temperature, setTemperature] = useState(current.current.temperature)
    const [weatherCondition, setWeatherCondition] = useState(-1)

    useEffect(() => {
        setInterval(() => {
            const current = processWeatherData()
            setTemperature(current.current.temperature)
            setWeatherCondition(current.current.weatherCode) //TODO: Create function to update every 5 mins
        }, 300000)
    })
    return <>
        <h1>Weather</h1>
        {/*<h2>{weatherCondition}</h2>*/}
        <img src={cloudIcon} alt={"weatherCondition"}/>
        <h2>{temperature + "°F"}</h2>
    </>
}

export default Weather