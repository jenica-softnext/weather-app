const weatherContainer = document.querySelector(".weather-container");
const weatherInfo = document.querySelector(".weather-info");
const temperature = document.querySelector(".temperature");
const weatherDesc = document.querySelector(".description");
const weatherIcon = document.getElementById("icon");

const getWeather = function () {
  const apiKey = "ced1fbc6df5983dfde3fdf06e6d4ecbf";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("町の名前をアルファベットで入力してください");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
  `)
    .then((res) => res.json())
    .then((data) => showTemp(data))
    .catch((err) => alert("Error fetching current weather data.", err));
};

const showTemp = function (data) {
  if (data.cod === "404") {
    document.querySelector(".err").innerHTML = "該当する町の名前が見つかりません";
    document.querySelector(".err").style.display = "block";
    console.log(data.message);
  } else {
    const temp = data.main.temp;
    const place = data.name;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    document.querySelector(".err").innerHTML = "";
    document.querySelector(".err").style.display = "none";
    temperature.innerHTML = `The weather in ${place} is <span>${temp}°C</span>`;
    weatherInfo.style.height = "360px";
    weatherDesc.innerHTML = desc;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    if (temp >= 35) {
      document.body.classList.add("hot");
      document.body.classList.remove("warm");
      document.body.classList.remove("cold");
    } else if (temp > 20 && temp < 35) {
      document.body.classList.remove("hot");
      document.body.classList.add("warm");
      document.body.classList.remove("cold");
    } else if (temp <= 20) {
      document.body.classList.remove("hot");
      document.body.classList.remove("warm");
      document.body.classList.add("cold");
    }
  }
};
