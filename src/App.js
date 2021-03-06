import React, { useState } from "react";


const api = {
  key : "cb1462ea21406aeb0bac3ad889ea684d",
  base : "https://api/openweathermap.org/data/2.5/"
}


function App() {

  const dateBuilder = (e) => {
    let months = ["January", "Febrauary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if(e.key === "Enter"){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(results => setWeather(results))
      .catch(err => console.log("error", err))};
    }
  
  
 
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input type="text" className ="search-bar" placeholder="Search.." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}{'\u00b0'}c</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
