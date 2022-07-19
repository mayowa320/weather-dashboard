let weatherAPIkey;
let countriesAPIkey;

let city_search_input;
let search_btn;

let city;
let resultList;
let lat;
let lon;
let weatherData;
window.onload = () => {
  weatherAPIkey = "db3e74234e90b3ab070f5a919843e508";
  countriesAPIkey = "328d5a3aaa25e85506ef8faa8dbdf791";

  city_search_input = document.querySelector("#city_search");
  search_btn = document.querySelector("#search_btn");

  city = "";
  lat = "";
  lon = "";
  resultList = document.querySelector("#places");
  let form = document.querySelector("#form");
  form.addEventListener("submit", formSubmit);
  weatherData = {};
};
let formSubmit = async (e) => {
  e.preventDefault();
  city = city_search_input.value;
  if (!Object.keys(weatherData).includes(city)) {
    await getLatLon();
    await getWeather();
  }
  displayDetails(city);
};
// city_search_input.addEventListener("change", (e) => {
//   let value = e.target.value;
//   city = value;
// });

let getLatLon = async () => {
  let respond = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weatherAPIkey}`
  );

  let data = await respond.json();
  lat = parseInt(data[0].lat);
  lon = parseInt(data[0].lon);
};
let getWeather = async () => {
  let respond = await fetch(
    `http://www.api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}&units=imperial&cnt=6`
  );
  let data = await respond.json();
  // console.log(data);
  weatherData[city] = data;
  // create a button for the current city and set an event listner to perform the display
  // remember to create a list element to populate the buttons
};
let displayDetails = (city) => {
  // create the UI elements and display them
  // remember to create a container in html and CSS
};
