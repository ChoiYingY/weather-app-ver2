import React, {useState} from 'react';
import TempBox from './tempBox';

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

    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;

    let time = utc + (1000 * weather.timezone);
    var newDate = new Date(time);

    let day = days[newDate.getDay()];
    let date = newDate.getDate();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();

    return `${day}, ${date} ${month} ${year}, ${newDate.toLocaleTimeString()}`;
  }

  return (
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
                <div className='location'>{weather.name}
                {(weather.sys.country !== undefined) ? (", "  + weather.sys.country) : ""}</div>
                <div className='date'>{dateBuilder(new Date())}</div>
              </div>

              <div className='weather-box'>
                <div className='temperatures'>
                  <TempBox tempLabel="Current temp: " temp={weather.main.temp}/>
                  <TempBox tempLabel="Feels like: " temp={weather.main.feels_like}/>
                  <TempBox tempLabel="Lowest temp: " temp={weather.main.temp_min}/>
                  <TempBox tempLabel="Highest temp: " temp={weather.main.temp_max}/>
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
