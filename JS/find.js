document.addEventListener('DOMContentLoaded', function () {
    const btnFind = document.querySelector('.btn-find');
    const cityInput = document.querySelector('.field-find');

    btnFind.onclick = function() {
        // Получаем введенный текст из инпута
        const city = cityInput.value.trim();

        // Сохраняем введенный город в localStorage
        localStorage.setItem('selectedCity', city);

    };

    cityInput.addEventListener("keydown", (e) => {
        if(e.keyCode === 13) {
            // Получаем введенный текст из инпута
            const city = cityInput.value.trim();

            // Сохраняем введенный город в localStorage
            localStorage.setItem('selectedCity', city);
            window.location.href = "index.html";
        }
    })


})