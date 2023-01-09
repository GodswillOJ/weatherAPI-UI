const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('city');
const weather = document.querySelector('.weather')
const API_KEY = "035b0638e156c0be851813e29f19aa8f";
const API_key = 'c26142ebb10d8548d42fbb7e48a4f9e4';


//defaults city when page loads
let cityInput = "Port harcourt";

//add click ebents for each city
cities.forEach((city) =>{
    city.addEventListener('click', (e) => {
        //change city to clicked one
        cityInput = e.target.innerHTML;
        //displays date of weather API
        fetchWeatherData();
        //simple animation
        app.style.opacity = "0";
    });
})

//add submit event to the form
form.addEventListener('submit', (e) => {
    //on empty search bar, throws alert
    if(search.value.length == 0) {
        alert('Please enter city name');
    } else {
        //change city to a written text
        cityInput = search.value;
        //function fetches and displays all data from weather API
        fetchWeatherData();
        search.value = "";
        //fade out the app
        app.style.opacity ='0';
    }
    e.preventDefault();
    }
);

function displayResult (weather) {
    console.log(weather);
    
    nameOutput.innerText = `${weather.name}, ${weather.sys.country}`;
    // let now = new Date();
    // let date = document.querySelector()
}

function dayOfTheWeek(day, month, year) {
        const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

getWeatherData() 
function getWeatherData () {
    navigator.geolocation.getCurrentPosition ((success) => {
        
        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()
        ).then(data => {   
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData (data) {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const year = time.getDate();
    const hour = time.getHours();
    const Hr24 = hour >= 13 ? hour %12: hour
    const minute = time.getMinutes();
    const ampm = hour >=12 ? 'pm' : 'am';


    //adds info to the page
    dateOutput.innerHTML = `${dayOfTheWeek(day, month, year)} ${day}, ${month}, ${year}`;
    timeOutput.innerHTML = time;
    //adds name to city
    //adds name to city
    nameOutput.innerHTML = data.name;
    const cont = document.querySelector('.cont');
    cont.textContent = data.sys.country;

    const cloudy = document.querySelector('.cloud')
    const humidity = document.querySelector('.humidity')
    const wind = document.querySelector('.wind')

    var result = document.createElement('h2')
    result.textContent = data.clouds.all;
    cloudy.append(result)
    
    var hum = document.createElement('h2')
    hum.textContent = data.main.humidity;
    humidity.append(hum)
    
    var windinfo = document.createElement('h2')
    windinfo.textContent = data.wind.speed;
    wind.append(windinfo)

    let tempinfo = document.createElement('h1')
    tempinfo.textContent = data.main.temp;
    temp.append(tempinfo)

    // let myicon = document.createElement('h1')
    // myicon.textContent = data.weather[0].icon;
    // icon.append(myicon)

    iconCode = data.weather[0].icon;
    type_cloud = data.weather[0].description;

    weather.innerHTML  = `<div class="icon"><img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt=""></div>
    <span class="condition">${type_cloud}</span>`;

};
