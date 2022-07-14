let weatherAPIkey = "db3e74234e90b3ab070f5a919843e508";
let countriesAPIkey = "328d5a3aaa25e85506ef8faa8dbdf791";

let city_search_input = document.querySelector("#city_search");
let search_btn = document.querySelector("#search_btn");

let city = "";
let resultList = document.querySelector("#places");

city_search_input.addEventListener("change", (e) => {
  let value = e.target.value;
  city = value;
});

search_btn.addEventListener("click", async () => {
  let respond = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIkey}&units=imperial`
  );
  let data = await respond.json();
  console.log(data);
});
