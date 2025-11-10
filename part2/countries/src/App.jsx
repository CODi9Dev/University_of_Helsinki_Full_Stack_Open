import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Country from './components/Country'
import CountryDetail from './components/CountryDetail'
import './index.css'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedCountry, setSelectedCountry] = useState([])

  useEffect(() => {
    if (search.length > 0) {
      if (countriesToShow.length == 1) {
        setSelectedCountry(countriesToShow[0])
        setMessage('')
        setShowCountries(false)
        setShowDetail(true)
      } else if (countriesToShow.length > 10) {
        setMessage('Too many matches, specify another filter')
        setShowCountries(false)
        setShowDetail(false)
      } else {
        setMessage('')
        setShowCountries(true)
        setShowDetail(false)
      }
    } else {
      setMessage('')
      setShowCountries(false)
    }
  }, [search])

  useEffect(() => {
    countriesService.getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleCountryClick = (country) => {
    setSelectedCountry(country)
    setShowCountries(false)
    setShowDetail(true)
  }

  const countriesToShow = (search.length > 0)
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : countries
    
  return (
    <>
      <div>find countries <input type="text" onChange={handleSearch} value={search} /></div>
      { message }
      
      { showCountries &&
        <div id="countries-list" className="countries__list">
          {countriesToShow.map((country, index) =>
            <Country key={index} country={country} handleCountryClick={handleCountryClick} />
          )}
        </div>
      }

      { showDetail &&
        <CountryDetail country={selectedCountry} />
      }

      <div className="countries__footer">The Weather API used for this exercise is: https://www.weatherapi.com/</div>
    </>
  )
}

export default App
