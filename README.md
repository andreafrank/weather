Thank you to https://www.youtube.com/watch?v=J4PDxTO3oj0 forthe geolocation tutorial
https://dev.to/shimjudavid/usegeoposition-hook-custom-react-hook-to-grab-latitude-and-longitude-from-a-given-address-5am2


import React, { useState, useEffect } from 'react';

function CurrentWeather() {
    // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
 //    const key = 'API_KEY';

    const [feels_like, setFeelsLike]    = useState('');
    const [mainTemp, setMainTemp]       = useState('');
    const [description, setDescription] = useState('');
    const [main, setMain]               = useState('');

    useEffect(() => {
        function getWeatherData(lat, lon) {
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=439e167525fbc2afd365dc0d9d0f40e5&units=imperial`
            console.log(weatherURL)
            fetch(weatherURL)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setFeelsLike(result.main.feels_like.toFixed(1));
                setMainTemp(result.main.temp.toFixed(1));
                setDescription(result.weather[0].description);
                setMain(result.weather[0].main);
            })
        };

        const weatherInit = () => {
            const success = (position) => {
                getWeatherData(position.coords.latitude, position.coords.longitude);
            }

            const error = () => {
              alert('unable to retrieve location.');
            }

            if (navigator.geolocation) {
              return navigator.geolocation.getCurrentPosition(success, error);
            } else {
              alert('Your browser does not support location tracking, or permission is denied.');
            }   
        } 

        weatherInit();

    }, [])
    
    return (
        <>
            <h1>Main Temperature : {mainTemp} °f</h1>
            <h1>Feels like: {feels_like} °f</h1>
            <h1>Weather Parameter: {main}</h1>
            <h1>Description : {description}</h1>
        </>
    )   
};

export default CurrentWeather;