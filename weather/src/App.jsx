import React, { useEffect, useState } from 'react';
import useTypewriter from './useTypewriter';
import axios from 'axios';

function App() {
  const typedText = useTypewriter('Weeather', 100); // Using the custom hook with the word "Weather"
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);

  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=6958a5e7b7701817c2d34149b5cd4fa1`);
        setData(response.data);
        setWeather(response.data.main.temp); // Optional: directly set weather temperature
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-[url('https://res.cloudinary.com/dqp1z12my/image/upload/f_auto,q_auto/u3yhvxaay6vbuqlfkitm')] bg-full min-h-screen bg-cover text-white text-center font-bold text-5xl font-sans pt-8 z-50">
      <div>
        <div>{typedText} </div>
        <div className='pt-4'> 
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Enter the Location'
            className='text-center text-black rounded-lg'
            onKeyPress={search}
            
          />
          <div className=''>
          {data ? (
            <div className="mt-4 text-2xl">
              {console.log(data)}
              <p>Location: {data.name}</p>
              <p>Temperature: {data.main.temp}°C</p>
              <p>Weather: {data.weather[0].description}</p>
              <p>Humidity: {data.main.humidity}</p>
            </div>
          ):(query?(<p className='pt-4'>No Location Found</p>):(<p className='pt-4'></p>))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
