
window.addEventListener('beforeunload', function (event) {
    localStorage.removeItem('selectedCity');
});

const weatherContent = document.querySelector('.weather-content');
const selectedCity = localStorage.getItem('selectedCity');
const api = '4379e359a43e158fba51dfd6ab6c79f2';


if (selectedCity) {
  getCoordsFromCity(selectedCity);
}


// Автоматическое определение местоположения и погоды пользователя
navigator.geolocation.getCurrentPosition(geoCorrect, geoFail);

// Если пользователь разрешил доступ к геолокации
function geoCorrect(position) {
	getWeatherFromCoords(position.coords.latitude, position.coords.longitude, null)
}

// Если пользователь запретил доступ к геолокации
function geoFail(positionError) {
    // fetch('https://api.ipify.org?format=json')
    //     .then((response) => {
    //         return response.json()
    //     })
    //     .then((data) => {
    //         getCityFromIp(data.ip)
    //     })
    //     .catch(error => {
    //         console.error("Произошла ошибка при определении погоды: ")
    //         showErrorContainer()
    //     })
}

// Функция определения погоды по координатам
function getWeatherFromCoords(lat, lon, currentCity) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=bd69def61e044b12aa285f853e73965f`)
      .then((response) => {
          return response.json()
      })
      .then((data) => {
          console.log(data)
          
          let city;
          if (currentCity == null) {
              city = data.name
          }
          else {
              city = selectedCity
          }

          const weatherContent = document.createElement('div');
      weatherContent.classList.add('weather-content');

      const degrees = document.createElement('span');
      degrees.classList.add('degrees');
      degrees.textContent = `${data.main.temp}℃`;

      const cityText = document.createElement('p');
      cityText.classList.add('city');
      cityText.textContent = `Windy in ${city}`;

      const changeCityLink = document.createElement('a');
      changeCityLink.classList.add('change_city');
      changeCityLink.href = 'find.html';
      changeCityLink.textContent = 'Change city';

      // Добавляем созданные элементы в блок .weather-content
      weatherContent.appendChild(degrees);
      weatherContent.appendChild(cityText);
      weatherContent.appendChild(changeCityLink);

      // Находим блок, который нужно заменить
      const currentWeather = document.querySelector('.weather-content');

      // Заменяем блок новым содержанием
      currentWeather.parentNode.replaceChild(weatherContent, currentWeather);
      })
      .catch(error => {
          console.error("Произошла ошибка при определении погоды: " + error.message)
      })
}

function createHtmlElements(dataWeather, curCity) {
      const weatherContent = document.createElement('div');
      weatherContent.classList.add('weather-content');

      const degrees = document.createElement('span');
      degrees.classList.add('degrees');
      degrees.textContent = `${dataWeather.main.temp}℃`;

      const cityText = document.createElement('p');
      cityText.classList.add('city');
      cityText.textContent = `Windy in ${curCity}`;

      const changeCityLink = document.createElement('a');
      changeCityLink.classList.add('change_city');
      changeCityLink.href = 'find.html';
      changeCityLink.textContent = 'Change city';

      addHtmlElements(weatherContent, degrees, cityText, changeCityLink);
}

function addHtmlElements(weather, degree, city, change) {
      // Добавляем созданные элементы в блок .weather-content
      weather.appendChild(degree);
      weather.appendChild(city);
      weather.appendChild(change);

      // Находим блок, который нужно заменить
      const currentWeather = document.querySelector('.weather-content');

      // Заменяем блок новым содержанием
      currentWeather.parentNode.replaceChild(weatherContent, currentWeather);
}

// Функция определения координат города
function getCoordsFromCity(city) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=bd69def61e044b12aa285f853e73965f`)
      .then((response) => {
          return response.json()
      })
      .then((data) => {
          console.log(data)

          // Получение координат из Json
          let lat = data[0].lat
          let lon = data[0].lon
          let cityName = data[0].name

          // Определение погоды по координатам
          getWeatherFromCoords(lat, lon, cityName)
      })
      .catch(error => {
          console.error("Произошла ошибка при определении местоположения города: " + error.message)
          showErrorContainer()
      })
}