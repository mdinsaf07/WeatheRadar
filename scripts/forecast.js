//This is an API key.Only 50 requests can be made using this API key.
const key = 'AOlb84Pba81uChvWHMBaBCmAaC5vO6Gr';

//This function takes city typed in by the user as a parameter and fetches the city details.
const getCity = async (city) => {
    const endpoint = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(endpoint + query); //returns a promise
    const data = await response.json();  //returns a promise
    return data[0];
}

/*The city details contains a Key attribute through which the weather of that city is fetched.
 This is done using the below function*/
const getWeather = async (id) => {
    const endpoint = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const response = await fetch(endpoint + query);
    const data = await response.json();
    return data;
}

