// На странице index.htm
const weatherContent = document.querySelector('.weather-content');
const selectedCity = localStorage.getItem('selectedCity');
const api = '4379e359a43e158fba51dfd6ab6c79f2';
  
if (selectedCity) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${api}`;
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
degrees.textContent = `${data.main.temp}℃`;

const cityText = document.createElement('p');
cityText.classList.add('city');
cityText.textContent = `Погода в городе ${data.name}`;

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