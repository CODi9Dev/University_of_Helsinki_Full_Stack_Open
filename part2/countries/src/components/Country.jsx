const Country = ({ country, handleCountryClick }) => {
  return (
    <div>{country.name.common} <button onClick={() => handleCountryClick(country)}>Show</button></div>
  )
}

export default Country