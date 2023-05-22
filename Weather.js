const baseURL = "http://api.openweathermap.org";
const API_KEY = "8707f97c3d30138cbc0c5e3af77830ff";
const IMGURL = "https://openweathermap.org/img/wn/"

let chosenCity = "London";
const fetchCityCoords = async (city) => {
    const cityRes = await fetch(
      `${baseURL}/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );
  

    const cityData = await cityRes.json();
  
    const { lat, lon } = cityData[0];
    
    timeFetcher();
    fetchWeatherData(lat, lon, city);
  };

  const fetchWeatherData = async (lat, lon) => {
    const cityWeather = await fetch(
      `${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang={sv}`
    );
  
    const weatherData = await cityWeather.json();
  
    const currentWeather = {
      name,
      weather: [{ description, icon }],
      main: { humidity, pressure, feels_like, temp },
      wind: { speed },
    
    } = weatherData;

    const img = `https://openweathermap.org/img/wn/${icon}.png`
    console.log(img )
  
    setDivData(name, "city", img);
    setDivData(`${humidity} %`, "humidity");
    setDivData(`${pressure} hPa`, "pressure");
    setDivData( `${temp}°C`, "temp");
    setDivData(`${speed} m/s`, "speed");
    setDivData(`${feels_like} °C `, "feels_like");
  };

  //Funktion för att hämta ut nuvarande tid.
const timeFetcher = () => {
    let currentDay = new Date(); 
    let currentTime =
      "Datum:  " +
      currentDay.getFullYear() +
      " - " +
      (currentDay.getMonth()+1) +
      " - " + 
      currentDay.getDate() +  
      "  Tid: " +  
      currentDay.getHours() +
      ":" +
      currentDay.getMinutes() +
      ":" +
      currentDay.getSeconds();
      time = currentTime;
    

  
    const element = document.getElementById("tid");
    element.innerHTML = time;
  };

 
  const setDivData = (text, id, img) => {
    const element = document.getElementById(id);
    element.innerHTML = text;
    if(img != null) {
    let elem = document.createElement("img");
    elem.src = img
    element.appendChild(elem);
  }
};
  
  //Här har vi funktionen när man klickar på en knapp i HTMLN/webbsidan.
  const onClickCity = (city) => {
    chosenCity = city;
    fetchCityCoords(chosenCity);
  };
  
  //Default hämtar något startsida
  fetchCityCoords(chosenCity);
  
  setInterval(() => {
    timeFetcher();
  }, 1000);

  setInterval(() => {
    fetchCityCoords(chosenCity);
  }, 60000);