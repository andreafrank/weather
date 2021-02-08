import React from 'react';
// import CurrentWeather from './CurrentWeather';
import UserGeolocation from './UserGeolocation'

const App = () => {
	const location = UserGeolocation();
	
	return (
		<div className="inline-block mr-auto pt-1">
                                {location.loaded
                                    ? JSON.stringify(location)
                                    : "Location data not available yet."}
                            </div>
	)
};

export default App;