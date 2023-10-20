document.addEventListener('DOMContentLoaded', function () {
    const btnFind = document.querySelector('.btn-find');

    btnFind.addEventListener('click', function() {
        // Получаем введенный текст из инпута
        const cityInput = document.querySelector('.field-find');
        const city = cityInput.value.trim();

        // Сохраняем введенный город в localStorage
        localStorage.setItem('selectedCity', city);

    });
})