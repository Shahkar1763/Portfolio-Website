const apiKey = "f18bde8ffcd8471065ac7d0140a4dd81";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        alert("City not found. Please check the spelling and try again.");
        return;
    }

    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".Humdity p:first-child").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind p:first-child").innerHTML = Math.round(data.wind.speed) + "km/h";

    document.querySelector(".weather img").src = "rainy_pic.jpg";
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value !== "") {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchBox.value !== "") {
        checkWeather(searchBox.value);
    }
});

checkWeather("Nowshera");