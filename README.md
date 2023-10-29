[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/pkZneKf0)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12486506&assignment_repo_type=AssignmentRepo)
# Weather

Зарегистрируйтесь на сайте [https://openweathermap.org/api](https://openweathermap.org/api/one-call-api) и получите свой `API_KEY`

Зарегистрируйтесь на сайте https://geo.ipify.org/code-samples и получите свой `API_KEY`

---

Приложение должно запрашивать у пользователя его координаты через `html5 geolocation api` браузера. Если все получилось, то запрашивать погоду по этим координатам. Для этого есть метод https://openweathermap.org/api/one-call-api

Если пользователь запретил автоопределение или что-то пошло не так, тогда нужно попытаться самим определить его местоположение по косвенным признакам. 

Сначала определить IP через сервис [https://www.ipify.org](https://www.ipify.org/), потом, зная IP адрес его определить город через https://geo.ipify.org/docs (API type 1 Country). После запросить погоду по городу через https://openweathermap.org/current

Если что-то пошло не так или пользователь нажимает на «Change city», тогда нужно показать текстовое поле, в которое можно ввести название города. И по этому городу запросить погоду методом https://openweathermap.org/current. 

В случае ошибок, показать экран с ошибкой и кнопку «Try again», которая переводит нас на экран для ввода названия города.
