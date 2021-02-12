import React, { useState, useEffect } from 'react';
import moment from 'moment';

const CurrentWeather  = () => {
	const [lat, setLat] 					= useState(undefined);
	const [lon, setLon] 					= useState(undefined);
	const [err, setErr] 					= useState(undefined);
	const [tempC, setTempC] 				= useState(undefined);
	const [tempF, setTempF] 				= useState(undefined);
	const [city, setCity] 					= useState(undefined);
	const [country, setCountry]				= useState(undefined);
	const [humidity, setHumidity] 			= useState(undefined);
	const [description, setDescription] 	= useState(undefined);
	const [icon, setIcon] 					= useState(undefined);
	const [sunrise, setSunrise] 			= useState(undefined);
	const [sunset, setSunset] 				= useState(undefined);

	const getPosition = (options) => {
	    return new Promise(function (resolve, reject) {
	      navigator.geolocation.getCurrentPosition(resolve, reject, options);
	    });
  	};

 	const getWeather = async (lat, lon) => {     
	    const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`);
	    const data = await api_call.json();
	    
	    setLat(lat);
	    setLon(lon);
	    setCity(data.name);
	    setTempC(Math.round(data.main.temp));
	    setTempF(Math.round(data.main.temp * 1.8 + 32));
	    setHumidity(data.main.humidity);
	    setDescription(data.weather[0].description);
	    setIcon(data.weather[0].icon);
	    setSunrise(moment.unix(data.sys.sunrise).format('hh:mm a'));
	    setSunset(moment.unix(data.sys.sunset).format('hh:mm a'));
  	};

  	useEffect(() => {
  		// express in ternary
  		if (navigator.geolocation) {
	     	getPosition()
	    	.then((position) => { getWeather(position.coords.latitude, position.coords.longitude )})
	      	.catch(setErr => err.message);
    	} else {
      		alert("Geolocation not available")
    	};

    	const timerID = setInterval(
    		() => getWeather(lat, lon),
      		600000
    	);  

    	clearInterval(timerID);

    }, []);

    if (city) {
      	return (
	        <ul> 
	        	<div>  
		          	<li> {city} </li>
		            <li> {tempC} &deg;C </li>
		            <li> {tempF} &deg;F</li>            
		            <li> humidity: {humidity}% </li>
		            <li> {description} </li>        
		          	<li> {/*<br /> <img src={`http://openweathermap.org/img/w/${icon}.png`} />*/} </li>
	          	</div> 

	        	<div>
		            <li>{sunrise}</li>
		            <li>{sunset}</li>
	        	</div>       
	        </ul>
    	)
    } else {
      	return null;
    }   
}

export default CurrentWeather;
