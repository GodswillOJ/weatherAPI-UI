const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const form = document.getElementById('locationInput');
const btn = document.querySelector('.submit');
const weather = document.querySelector('.weather')


//defaults city when page loads
const api_key = "ad736e4c2d2aa0e9b43d1b4db00b23b9";
const  baseurl = "https://api.openweathermap.org/data/2.5/";
const searched = document.querySelector('.search');

searched.addEventListener('keypress', setQuery);

function setQuery (evt) {
    if(searched.value.length == 0) {
        alert('Please enter city name');
    } else if (evt.keyCode == 13){
        getResults(searched.value);
        console.log(searched.value);
       }
}

function getResults (query) {
    fetch(`${baseurl}weather?q=${query}&units=metric&appid=${api_key}`).then(data => {
        return data.json();
    }).then(displayResults);
}

function displayResults (data) {
    console.log(data);
    const nameOutput = document.querySelector('.name');
   nameOutput.innerText = `${data.name}, ${data.sys.country}`;
   temp.innerText = `${data.main.temp}`;
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
    dateOutput.innerHTML = `${dayOfTheWeek(day, month, year)}`;
    timeOutput.innerHTML = time;

    const cloudy = document.querySelector('.cloud')
    const humidity = document.querySelector('.humidity')
    const wind = document.querySelector('.wind')

    cloudy.textContent = data.clouds.all;
    
    humidity.textContent = data.main.humidity;
    
    wind.textContent = data.wind.speed;

    // let myicon = document.createElement('h1')
    // myicon.textContent = data.weather[0].icon;
    // icon.append(myicon)

    iconCode = data.weather[0].icon;

    type_cloud = data.weather[0].description;

    weather.innerHTML  = `<div class="icon"><img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt=""></div>
    <span class="condition">${type_cloud}</span>`;

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

