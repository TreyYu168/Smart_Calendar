import {useEffect, useState} from "react";
import cloudIcon from "../assets/icons/02n.png"

interface ForecastDaily {
    temperature_2m_min: number[],
    temperature_2m_max: number[],
    time: string[],
    weather_code: number[]
}

interface ProcessedForecast {
    date: string,
    high: number,
    low: number,
    weather_code: number
}

function addTime(date: string): string {
    let slowTime = new Date(date)
    let correctedTime: number = slowTime.getTime() + 25200000

    return new Date(correctedTime).toDateString().substring(0, 10)
}
function processForecast(data: ForecastDaily): ProcessedForecast[] {
    let results = []

    for(let i: number = 0; i < data.time.length; i++) {
        let dailyForecast: ProcessedForecast = {
            'date': addTime(data.time[i]),
            'high': data.temperature_2m_max[i],
            'low': data.temperature_2m_min[i],
            'weather_code': data.weather_code[i]
        }

        results.push(dailyForecast)
    }

    return results
}

const Weather = () => {

    const defaultForecast = {
        'date': '',
        'high': -1,
        'low': -1,
        'weather_code': -1
    }
    const [currentTemperature, setCurrentTemperature] = useState(-1)
    // const [todayHigh, setTodayHigh] = useState(-1)
    // const [todayLow, setTodayLow] = useState(-1)
    // const [weatherCondition, setWeatherCondition] = useState(-1)
    const [forecast, setForecast] = useState([defaultForecast])

    const getWeatherAPI = () => {
        fetch('https://api.open-meteo.com/v1/gfs?latitude=39.5539&longitude=-104.9694&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver')
        .then((response) => {
            return response.json()
        })
        .then(data => {
            setCurrentTemperature(data.current.temperature_2m)
            // setWeatherCondition(data.current.weather_code)
            setForecast(processForecast(data.daily))
        })
    }


    useEffect(() => {
        setInterval(() => {
            getWeatherAPI()
        }, 300000)
    })

    return <>
        <h1>Weather</h1>
        {/*<h2>{weatherCondition}</h2>*/}
        <img src={cloudIcon} alt={"weatherCondition"}/>
        <h2>{currentTemperature + "°F"}</h2>
        {forecast.map((item) => (
            <div className='list-group-item'
                key={item.date}>
                {item.date} High: {item.high}°F Low: {item.low}°F
            </div>
        ))}
        <button onClick={getWeatherAPI}>Click</button>
    </>
}

export default Weather