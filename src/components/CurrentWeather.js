import React, { useState, useEffect } from 'react';

const CurrentWeather = () => {
	const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const key = 'API_KEY';
    const [feels_like, setFeelsLike] = useState('');
    const [mainTemp, setMainTemp] = useState('');
    const [description, setDescription] = useState('');
    const [main, setMain] = useState('');
    const [iconID, setIconID] = useState('');
   
    useEffect(()=> {
		fetch('https://api.openweathermap.org/data/2.5/weather?q=Karachi,pk&APPID={key}&units=imperial')
		.then(response => response.json())
		.then(result => {
		    console.log(result);
		    setFeelsLike(result.main.feels_like);
		    setMainTemp(result.main.temp);
		    setDescription(result.weather[0].description);
		    setMain(result.weather[0].main);
		    setIconID(result.weather[0].icon);
		})
	},[])
	
	return (
	    <>
		    <h1>Main Temperature : {mainTemp} °f</h1>
		    <h1>Feels like: {feels_like} °f</h1>
		    <h1>Weather Parameter: {main}</h1>
		    <h1>Description : {description}</h1>
		    <img src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"} alt={"Icon representing " + main}/>
	    </>
	)	
};

export default CurrentWeather;