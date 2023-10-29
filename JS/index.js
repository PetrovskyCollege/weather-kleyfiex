
window.addEventListener('beforeunload', function (event) {
    localStorage.removeItem('selectedCity'); // очищаем ввод города вручную, если была перезагрузка страницы
});

const weatherContent = document.querySelector('.weather-content');
const selectedCity = localStorage.getItem('selectedCity'); // получаем введенный город
const api = '4379e359a43e158fba51dfd6ab6c79f2';
const apiIp = 'at_ulnQMrTr4JdZQvyY4kDLKaICtLJZR';
const errorContainer = document.querySelector('errorContainer');


if (selectedCity) { // если переменная города не пустая, то получаем координаты введенного города
  getCoordsFromCity(selectedCity);
}

// Проверяем, была ли геолокация уже запрошена в текущей сессии
if (!sessionStorage.getItem('geolocationRequested')) {
    // Запрашиваем геолокацию
    navigator.geolocation.getCurrentPosition(geoCorrect, geoFail);
  
    // Помечаем, что геолокация была запрошена в текущей сессии
    sessionStorage.setItem('geolocationRequested', 'true');
  }
  
  
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

// Если пользователь разрешил доступ к геолокации
function geoCorrect(position) {
	getWeatherFromCoords(position.coords.latitude, position.coords.longitude, null)
}

// Если пользователь запретил доступ к геолокации
function geoFail(positionError) {
    fetch('https://api.ipify.org?format=json')
        .then((response) => { 
             return response.json() // получаем json
        })
         .then((data) => { // работаем с данными
            getIpToCity(data.ip)
         })
         .catch(error => { // ловим ошибку если она появится
            console.error("Произошла ошибка при определении погоды: " + error.message)
            showError();
        })
}

// Функция определения погоды по координатам
function getWeatherFromCoords(lat, lon, currentCity) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`)
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
              city = currentCity
          }
        
        let weatherDescription = data.weather[0].description;
        // Преобразование первой буквы описания погоды в заглавную
        weatherDescription = weatherDescription[0].toUpperCase() + weatherDescription.slice(1);

        const weatherContent = document.createElement('div');
        weatherContent.classList.add('weather-content');

        const degrees = document.createElement('span');
        degrees.classList.add('degrees');
        degrees.textContent = `${data.main.temp}℃`;

        const cityText = document.createElement('p');
        cityText.classList.add('city');
        cityText.textContent = `${weatherDescription} in ${city}`;

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
          console.error("Произошла ошибка при определении погоды: " + error.message);
          showError();
      })
}

// Функция определения координат города по ip
function getIpToCity(ip) {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiIp}&ipAddress=${ip}`)
        .then((response) => {
            return response.json() // получаем json
        })
        .then((data) => { // работаем с данными
            console.log(data)
            let locationLat = data.location.lat;
            let locationLng = data.location.lng;
            getWeatherFromCoords(locationLat, locationLng, null)
        })
        .catch(error => {
            console.error("Произошла ошибка при определении города: " + error.message)
            showError()
        })
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
          console.error("Произошла ошибка при определении местоположения города: " + error.message);
          showError();
      })
}

function showError() {
    window.location.href = "fail.html";
}