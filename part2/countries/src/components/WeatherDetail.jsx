import axios from 'axios'
import { useState, useEffect } from 'react'

const WeatherDetail = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState([])
	
  const apiKey = import.meta.env.VITE_WEATHER_KEY
	const weatherApiBaseUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.latlng[0]},${country.latlng[1]}&aqi=yes`

	useEffect(() => {
		axios
			.get(weatherApiBaseUrl)
			.then(response => {
				setWeatherInfo(response.data)
			})
			.catch(error => console.log(error))
	}, [])

	return (
    <>
      { weatherInfo && 
        <div>
          <h2>Weather in {country.name.common} (Weather Station: {weatherInfo?.location?.name} - {weatherInfo?.location?.region})</h2>
          <div>
            <div>Temperature: {weatherInfo?.current?.temp_c} Celsius</div>
            <div>
              <span>{weatherInfo?.current?.condition?.text}</span><img style={{verticalAlign: 'middle'}} src={weatherInfo?.current?.condition?.icon} />
              <br />
              Wind {weatherInfo?.current?.wind_kph} k/h - Direction {weatherInfo?.current?.wind_dir}
            </div>
          </div>
          <br />
          <div className="weather-api">
            <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0" /><br /></a>
            <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
          </div>
        </div>
      }
    </>
  )
}

export default WeatherDetail