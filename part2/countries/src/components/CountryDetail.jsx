import WeatherDetail from "./WeatherDetail"

const CountryDetail = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang, index) => <li key={index}>{lang}</li>)}
      </ul>
      <h2>Flag</h2>
      <img className="country__flag" src={country.flags.svg} />
      
      <WeatherDetail country={country} />
    </>
  )
}

export default CountryDetail