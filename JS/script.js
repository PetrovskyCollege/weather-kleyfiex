
    navigator.geolocation.getCurrentPosition(function(position) {
        // Координаты пользователя доступны в объекте `position`
        let userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        const api = '792c80c8ee642d0e8438345141e93194';
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${userLocation.lat}&lon=${userLocation.lng}&exclude=current&appid=${api}`;
        console.log(userLocation);

        fetch(url)
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
        });   
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



