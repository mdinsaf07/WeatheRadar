const cityForm = document.querySelector('form');        //Gets the form document node
const card = document.querySelector('.card');           // Gets the card document node
const details = document.querySelector('.details');     //Gets the details node
const time=document.querySelector('.time');
const icon=document.querySelector('.icon img');

/*On submiting the form, the below function is called. The value input 
by the user is retrieved and the updateCity() is called to update the city*/
cityForm.addEventListener('submit', e => {

    e.preventDefault();                                 //Prevents the default action on submit
    const city = cityForm.city.value;                   //Retrieves user input
    cityForm.reset();

    updateCity(city)                                    //updateCity() is called
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})


/*The below funtion retrieves the city details and weather of that city*/
const updateCity = async (city) => {
    const cityDetails = await getCity(city);            //returns a promise
    const weather = await getWeather(cityDetails.Key);  //returns a promise
    return { cityDetails, weather };
}

/*updateUI() displays the weather data to the user*/
const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;
    details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>  
                        <div class="my-3">${weather[0].WeatherText}</div>
                        <div class="display-4 my-4">
                        <span>${weather[0].Temperature.Metric.Value}</span>
                        <span>&deg;C</span>
                        </div>`                                             //Displays the weather details. Template literals are used.


    const iconSrc=`./img/icons/${weather[0].WeatherIcon}.svg`;      
    icon.setAttribute('src',iconSrc);                                       //Set the icon for this city
    let timeSrc=null;
    if(weather[0].IsDayTime){                                              
        timeSrc='./img/day.svg';
    }
    else
    {
        timeSrc='./img/night.svg'
    }

    time.setAttribute('src',timeSrc);                                       //Sets the time of the day for this city



    if (card.classList.contains('d-none')) {            //Initially the card is not displayed. Here the 'd-none' class is removed to display.
        card.classList.remove('d-none');
    }

    
}

