import React, { useState, useEffect } from 'react';
import moment from 'moment';

const CurrentWeather  = () => {
	const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
	const GEO_API_KEY = process.env.REACT_APP_GEOLOCATION_API_KEY 

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
	const [feels_like, setFeelsLike] 		= useState(undefined);

	const getCity = async (latitude, longitude) => {
		const cityFind = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEO_API_KEY}`);
       	const cityData = await cityFind.json();

       	setCity(cityData.results[0].address_components[3].long_name)

       	// console.log(cityData.results[0].address_components[3].long_name)
	}

	const getPosition = () => {
	    return new Promise(function (resolve, reject) {
	      navigator.geolocation.getCurrentPosition(resolve, reject);
	    });
  	};

 	const getWeather = async (lat, lon) => { 
 		getCity(lat, lon)   
	    const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
	    const data = await api_call.json();
	    
	    setLat(lat);
	    setLon(lon);
	    setCity(data.name);
	    setFeelsLike(data.main.feels_like);
	    setTempC(Math.round(data.main.temp));
	    setTempF(Math.round(data.main.temp * 1.8 + 32));
	    setHumidity(data.main.humidity);
	    setDescription(data.weather[0].description);
	    setIcon(data.weather[0].icon);
	    setSunrise(moment.unix(data.sys.sunrise).format('hh:mm a'));
	    setSunset(moment.unix(data.sys.sunset).format('hh:mm a'));
  	};

  	useEffect(() => {
  		// getCity(lat, lon)
  		if (navigator.geolocation) {
	     	getPosition()
	    	.then((position) => { getWeather( position.coords.latitude, position.coords.longitude )})
	    	// .then((options) => { getCity( position.coords.latitude, position.coords.longitude )})
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
		           	<li> feels like {feels_like.toFixed(0)} &deg;C </li>          
		            <li> {tempF} &deg;F </li> 
		            <li> feels like {(feels_like * 1.8 + 32).toFixed(0)} &deg;F </li>          
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
