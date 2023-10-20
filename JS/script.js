// navigator.geolocation.getCurrentPosition(function(position) {
//     // Координаты пользователя доступны в объекте `position`
//     let userLocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//     };})



    const weatherContent = document.querySelector('.weather-content');
    const divFind = document.querySelector('.div-find');
    const btnFind = document.querySelector('.btn-find');
  
   
  
    const form = document.getElementById('form-field');
    const input = document.querySelector('.field-find');
    let city;
    const api = 'b74cee90d3c64e3e929190415232010';
  
    btnFind.addEventListener('click', function(event) {
      event.preventDefault(); // Предотвращаем отправку формы
  
      // Получаем введенный текст из инпута
      city = input.value.trim();
      const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=no`;
      window.location.href = 'index.html';
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
  
          // Создаем верстку блока с погодой
          const html =`
            <div class="weather-content">
              <span class="degrees">${data.current.temp_c}℃</span>
              <p class="city">Погода в городе ${data.location.name}</p>
              <a href="find.html" class="change_city">Change city</a>
            </div>`;
  
          // Заменяем блок блоком с новым городом
          weatherContent.replaceWith(html);
        });
    });
  
    




