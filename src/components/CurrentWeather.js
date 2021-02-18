import React, { useState, useEffect } from 'react';
import moment from 'moment';
import unsplash from './apis/unsplash';

const CurrentWeather  = () => {
	const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
	const GEO_API_KEY = process.env.REACT_APP_GEOLOCATION_API_KEY 

	const [city, setCity] 					= useState(undefined);
	const [description, setDescription] 	= useState(undefined);
	const [err, setErr] 					= useState(undefined);
	const [feels_like, setFeelsLike] 		= useState(0);
	const [humidity, setHumidity] 			= useState(undefined);
	const [lat, setLat] 					= useState(undefined);
	const [lon, setLon] 					= useState(undefined);
	const [tempC, setTempC] 				= useState(undefined);
	const [tempF, setTempF] 				= useState(undefined);
	const [sunrise, setSunrise] 			= useState(undefined);
	const [sunset, setSunset] 				= useState(undefined);
	const [image, setImage] 				= useState(undefined);
	const [imgurl, setImgurl]				= useState('');

	const getWeatherImage = async (term) => {
		const response = await unsplash.get('search/photos', {
			params: { query: term }
		});
		setImage(response.data.results[0])

		const first_item = response.data.results[0]
		const url = first_item.urls.regular;

		setImgurl(url);

	}

	const getCity = async (latitude, longitude) => {
		const cityFind = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEO_API_KEY}`);
       	const cityData = await cityFind.json();

       	setCity(cityData.results[0].address_components[3].long_name)
	};

	const getPosition = () => {
	    return new Promise(function (resolve, reject) {
	      navigator.geolocation.getCurrentPosition(resolve, reject);
	    });
  	};

 	const getWeather = async (lat, lon) => { 
 		getCity(lat, lon); 

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
	    setSunrise(moment.unix(data.sys.sunrise).format('hh:mm a'));
	    setSunset(moment.unix(data.sys.sunset).format('hh:mm a'));

	    getWeatherImage(data.weather[0].description)
  	};

  	useEffect(() => {
  		if (navigator.geolocation) {
	     	getPosition() 
	    	.then((position) => { getWeather(position.coords.latitude, position.coords.longitude)})
	      	.catch((setErr) => err.message);
    	} else {
      		alert("geolocation not available. please allow browser to locate you.")
    	};

    	const timerID = setInterval(
    		() => getWeather(lat, lon),
      		600000
    	);  

    	clearInterval(timerID);

    }, []);

    if (city) {
      	return (
	        <div style={{
	        	height: `100vh`,
	        	backgroundImage: `url(${imgurl})`,
	        	backgroundPosition: `center`,
	        	backgroundRepeat: `noRepeat`,
	        	backgroundSize: `cover`,
	        }}>
	       		<ul>  
			        <li> {city} </li>
			        <li> {tempC} &deg;C </li>
			        <li> feels like {feels_like.toFixed(0)} &deg;C </li>          
			        <li> {tempF} &deg;F </li> 
			        <li> feels like {(feels_like * 1.8 + 32).toFixed(0)} &deg;F </li>          
			        <li> humidity: {humidity}% </li>
			        <li> {description} </li>        
			        <li>sunrise: {sunrise}</li>
			        <li>sunset: {sunset}</li>
		        </ul>
	        </div>
    	)
    } else {
      	return "please wait. retrieving your location...";
    }   
}

export default CurrentWeather;


   
