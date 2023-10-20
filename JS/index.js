// На странице index.html
const weatherContent = document.querySelector('.weather-content');
const selectedCity = localStorage.getItem('selectedCity');
const api = 'b74cee90d3c64e3e929190415232010';
  
if (selectedCity) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${selectedCity}&aqi=no`;
    console.log(selectedCity);
    fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          
          // Создаем элементы DOM
const weatherContent = document.createElement('div');
weatherContent.classList.add('weather-content');

const degrees = document.createElement('span');
degrees.classList.add('degrees');
degrees.textContent = `${data.current.temp_c}℃`;

const cityText = document.createElement('p');
cityText.classList.add('city');
cityText.textContent = `Погода в городе ${data.location.name}`;

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

        });
}