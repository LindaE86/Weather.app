const baseURL = "http://api.openweathermap.org";
const API_KEY = "8707f97c3d30138cbc0c5e3af77830ff";

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
      `${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=sv`
    );
  
    const weatherData = await cityWeather.json();
  
    const currentWeather = ({
      name,
      weather: [{ description }],
      main: { humidity, pressure, feels_like, temp },
      wind: { speed },
    } = weatherData);
  
    setDivData(name, "city");
    setDivData(humidity, "humidity");
    setDivData(pressure, "pressure");
    setDivData(temp, "temp");
    setDivData(speed, "speed");
    setDivData(feels_like, "feels_like");
  };

  //Funktion för att hämta ut nuvarande tid.
const timeFetcher = () => {
    let currentDay = new Date(); 
    let currentTime =
      "Date: " +
      currentDay.getFullYear() +
      " : " +
      (currentDay.getMonth()+1) +
      " : " +
      currentDay.getDate() +
      " Time: " +  
      currentDay.getHours() +
      ":" +
      currentDay.getMinutes() +
      ":" +
      currentDay.getSeconds();
    time = currentTime;
  
    const element = document.getElementById("tid");
    element.innerHTML = time;
  };
  
  const setDivData = (text, id) => {
    const element = document.getElementById(id);
    element.innerHTML = text;
  };
  
  //Här har vi funktionen när man klickar på en knapp i HTMLN/webbsidan.
  const onClickCity = (city) => {
    fetchCityCoords(city);
  };
  
  //Default hämtar något startsida
  fetchCityCoords("Göteborg");
  
  setInterval(() => {
    timeFetcher();
  }, 1000);