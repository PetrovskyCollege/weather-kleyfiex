let latitude, longitude;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        // Координаты пользователя доступны в объекте `position`
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    
      }, function(error) {
        // Обработка ошибки
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Без местоположения вы не узнаете погоду");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Информация о вашем местоположении недоступна");
            break;
        }
      });
  } else {
    alert("Геолокация не поддерживается браузером");
  }
  
console.log(latitude + " " + longitude);




/* fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current&appid=c352dcf016bfd35b7eec4ac20510f7e4')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Парсим JSON ответ, если он имеется
  })
  .then(data => {
    // Обрабатываем полученные данные
    console.log(data);
  })
  .catch(error => {
    // Обрабатываем ошибку
    console.error('There was a problem with the fetch operation:', error);
  }); */