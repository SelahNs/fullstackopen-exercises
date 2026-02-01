import { useEffect, useState } from "react"
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY;

const App = () => {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [wether, setWether] = useState([]);
  useEffect(() => {

    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response => setCountries(response.data));
  }, [])
  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedCountry(null);
  }

  

  const deliverable = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()));

  useEffect (() => {
    if (selectedCountry) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${api_key}&units=metric`).then(response => setWether(response.data))
    }
  },[selectedCountry]);

  useEffect (()=> {
    if (deliverable.length === 1) {
      setSelectedCountry(deliverable[0]);
    }
  },[deliverable])

  const display = (country) => {
    return (
      <div><h1>{country.name.common}</h1><p>Capital {country.capital}</p><p>Area {country.area}</p> <h3>Languages</h3><ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul> <img src={country.flags.png} alt={country.name.common} width="150" />{wether.main ? <div><h3>Weather in {country.capital}</h3><p>Temperature {wether.main.temp} Celsius</p><img src={`https://openweathermap.org/img/wn/${wether.weather[0].icon}@2x.png`} /><p>Wind {wether.wind.speed} m/s</p></div> : <p></p>}</div>
    )
  }

  return (
    <div>
      <form action="">
        find countries <input type="text" onChange={handleChange} value={value} />
      </form>
      {selectedCountry ? display(selectedCountry) : deliverable.length > 10 ?
        <p>Too many matches, specify another filter.</p> :
        deliverable.length > 1 ?
        <ul>{deliverable.map(country => <li key={country.name.common}>{country.name.common}<button onClick={() => setSelectedCountry(country)}>Show</button></li>)}</ul> : deliverable.length === 1 ? display(deliverable[0]) : <p></p>}
    </div>

  )
}
export default App;