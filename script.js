let weatherAPIkey;
let countriesAPIkey;

let city_search_input;
let search_btn;

let city;
let resultList;
let lat;
let lon;
let weatherData;
let buttons,
  today,
  future,
  todayTitle,
  todayTemp,
  todayGust,
  todayHumid,
  todayUV,
  todayImg;
window.onload = () => {
  weatherAPIkey = "1e444e598cf0f1fb24a3724e7e1fc188";

  city_search_input = document.querySelector("#city_search");
  search_btn = document.querySelector("#search_btn");

  city = "";
  lat = "";
  lon = "";
  resultList = document.querySelector("#places");
  let form = document.querySelector("#form");
  form.addEventListener("submit", formSubmit);
  buttons = document.querySelector(".buttons-container");
  today = document.querySelector(".today");
  future = document.querySelector(".future");
  todayTitle = document.querySelector("#today-title");
  todayTemp = document.querySelector("#today-temp");
  todayGust = document.querySelector("#today-wind-speed");
  todayHumid = document.querySelector("#today-humidity");
  todayUV = document.querySelector(".uv-index");
  todayImg = document.querySelector("#today-ico");
  weatherData = {};
};
let formSubmit = async (e) => {
  e.preventDefault();
  city = city_search_input.value;
  if (!Object.keys(weatherData).includes(city)) {
    await getLatLon(city);
    await getWeather();
  }
  displayDetails();
};
// city_search_input.addEventListener("change", (e) => {
//   let value = e.target.value;
//   city = value;
// });

let getLatLon = async (city) => {
  let respond = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weatherAPIkey}`
  );

  let data = await respond.json();
  lat = parseInt(data[0].lat);
  lon = parseInt(data[0].lon);
};
let getWeather = async () => {
  let respond = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}&units=imperial&cnt=6`
  );
  let data = await respond.json();
  weatherData[city] = data;
  let button = document.createElement("button");
  button.innerHTML = city;
  button.addEventListener("click", (event) => {
    city = event.target.innerHTML;
    displayDetails();
  });
  buttons.appendChild(button);
};
let displayDetails = () => {
  // create the UI elements and display them
  // remember to create a container in html and CSS
  future.innerHTML = "";
  let data = weatherData[city];
  console.log(weatherData);
  let list = data.list;
  let dt = new Date(list[0].dt * 1000);
  let dtstr = `${dt.getMonth()}/${dt.getDate()}/${dt.getFullYear()}`;
  todayTitle.innerHTML = `${city} (${dtstr})`;
  todayTemp.innerHTML = "Temp: " + list[0].main.temp;
  todayGust.innerHTML = "Wind Speed: " + list[0].wind.gust;
  todayHumid.innerHTML = "Humidity: " + list[0].main.humidity;
  let weather = list[0].weather;
  let todayId = weather[0].icon;
  todayImg.src = `https://openweathermap.org/img/wn/${todayId}@2x.png`;
  //http://openweathermap.org/img/wn/10d@2x.png

  // loop through remaining values.
  for (let i = 1; i < list.length; i++) {
    let data = weatherData[city];
    let dt = new Date(list[i].dt * 1000);
    let dtstr = `${dt.getMonth()}/${dt.getDate()}/${dt.getFullYear()}`;

    let title = document.createElement("h3");
    title.classList.add("title");
    let temp = document.createElement("p");
    temp.classList.add("temp");
    let gust = document.createElement("p");
    gust.classList.add("wind-speed");
    let humid = document.createElement("p");
    humid.classList.add("humidity");
    let iconImg = document.createElement("img");
    iconImg.classList.add("icon");

    title.innerHTML = `${city} (${dtstr})`;
    temp.innerHTML = "Temp: " + list[i].main.temp;
    gust.innerHTML = "Wind Speed: " + list[i].wind.gust;
    humid.innerHTML = "Humidity: " + list[i].main.humidity;
    weather = list[0].weather;
    let id = weather[0].icon;
    iconImg.src = `https://openweathermap.org/img/wn/${id}@2x.png`;
    let card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(title);
    card.appendChild(iconImg);
    card.appendChild(temp);
    card.appendChild(gust);
    card.appendChild(humid);
    card.style.border = "1px solid lightgrey";
    future.appendChild(card);
  }

  today.style.border = "1px solid lightgrey";
};
