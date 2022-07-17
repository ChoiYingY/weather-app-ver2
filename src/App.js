import React, {useState} from 'react';

const api = {
  key: `${process.env.REACT_APP_WEATHER_API_KEY}`,
  base: `${process.env.REACT_APP_WEATHER_API_BASE}`
}

function App() {
  // hooks
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [theme, setTheme] = useState("");

  const themeChange = (th) => {
    console.log(th.target.value);
    setTheme(th.target.value);
  }
  
  // fetch and set weather
  const search = (ev) => {
    if(ev.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())    // obtain json obj of fetched weather data
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(weather);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    // <div className='App'>
    <div className={
      (typeof weather.main != "undefined") ?
        ((weather.main.temp > 20) ? `App ${theme} ${"hot"}`:
        (weather.main.temp < 0) ? `App ${theme} ${"cold"}` : `App ${theme}`):
        `App ${theme}`
    }>
    <main>
        <div className='nav-bar'>
          <div className='search-box'>
            <input
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
              type="text" className='search-bar' placeholder='Search Location...'
            />
          </div>
          <div className='select-theme'>
            <select
              value={theme} onChange={themeChange}
              name='theme' className='choose-theme'
            >
              <option value="">Choose page theme...</option>
              <option value="op">One Piece</option>
              <option value="sumi">Sumikko Gurashi</option>
            </select>
          </div>
        </div>
        
        {
          (typeof weather.main != "undefined") ?
          (
            <div className='location-weather-box'>
              <div className='location-box'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                <div className='date'>{dateBuilder(new Date())}</div>
              </div>

              <div className='weather-box'>
                <div className='temperatures'>
                  <div className='temp'>
                    <h1 className='tempLabel'> Current temp: </h1>
                    <h2 className='temperature'> {Math.round(weather.main.temp)}°C </h2>
                  </div>

                  <div className='temp'>
                    <h1 className='tempLabel'> Feels like: </h1>
                    <h2 className='temperature'> {Math.round(weather.main.feels_like)}°C </h2>
                  </div>

                  <div className='temp'>
                    <h1 className='tempLabel'> Lowest temp: </h1>
                    <h2 className='temperature'> {Math.round(weather.main.temp_min)}°C </h2>
                  </div>

                  <div className='temp'>
                    <h1 className='tempLabel'> Highest temp: </h1>
                    <h2 className='temperature'> {Math.round(weather.main.temp_max)}°C </h2>
                  </div>
                </div>

                <div className='weather'>
                  {weather.weather[0].main}
                  {(weather.weather[0].main === "Rain") ? '🌧️' :
                    ((weather.weather[0].main === "Clouds") ? '☁️' : '☀️')}
                </div>
              </div>
              
            </div>
          ) : ('')  // display nothing if weather is undefined
        }
      </main>
    </div>
  );
}

export default App;
