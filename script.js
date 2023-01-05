const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('city');
const LAT = 4.854353740820219;
const LON = 6.983507088098146;
const API_KEY = "035b0638e156c0be851813e29f19aa8f";


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
        fetchweatherData();
        search.value = "";
        //fade out the app
        app.style.opacity ='0';
    }
    e.preventDefault();
    }
);
//function that will return a day of the week
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

/*function that fetches and displays data of an API*/
function fetchWeatherData() {
    //fetch the data automatically
    //fetch(`http://api.weatherapi.com/v1/current.json?key=efcf6f45d505450dbc5181812230501=${cityInput}`)
    //converts data to a regular js object
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`)
    // fetching the link of the API
    
    .then(response => response.json())
    .then(data => {
        //consoles.log the data
        console.log(data);
        //adds the api temp to the screen
        temp.innerHTML = data.current.temp_c + '&#176;';
        conditionOutput.innerHTML = data.current.condition.text;

        //gets date and time
        const date = date.location.localtime;
        const y = parseInt(date.subtr(0, 4));
        const m = parseInt(date.subtr(5, 2));
        const d = parseInt(date.subtr(8, 2));
        const time = date.subtr(11);

        //adds info to the page
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
        timeOutput.innerHTML = time;
        //adds name to city
        nameOutput.innerHTML = data.location.name;
        //gets corresponding url
        const iconId = data.current.condition.icon.subtr(
            "//cdn.weatherapi.com/weather/64x64".length
        );
        //stres image in page folder
        icon.src = "./icons" + iconId;

        //add weather details to page
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";

        //sets default time of day
        let timeOfDay = "day"
        //Get the unique id of weather
        const code = data.current.condition.code;

        //change to night
        if(!data.current.is_day) {
            timeOfDay = "night";
        }
        if(code == 1000) {
            //sets the background
            app.style.backgroundImage = `url(${timeOfDay}/clear.jpg)`;
            //changes image value
            btn.style.background = "#e5ba92";
            if(timeOfDay == "night") {
                btn.style.background = "#181e27"
            }
        }
        else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        ) {
            app.style.backgroundImage = `url(${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#fa6d1b";
            if(timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
        } else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
        ) {
            app.style.backgroundImage = `url(${timeOfDay}/sunny1.jpg)`;
            btn.style.background = "#647d75";
            if(timeOfDay == "night") {
                btn.style.background = "#325c80"
            }
            //finally
        } else {
            app.style.backgroundImage = `url(${timeOfDay}/snowy.jpg)`;
            btn.style.background = "#4d72aa";
            if(timeOfDay == "night") {
                btn.style.background = '#1b1b1b';
            }
        }
        //fade in the page
        app.style.opacity = "1";
        })
        .catch(() => {
            alert(`City not found, please try again`);
            app.style.opacity = "1";
        });
}

//Call the function
fetchWeatherData();

//fade in the page
app.style.opacity = "1";
