const weather = {
  apiKey: "708e7fd59bd92264d03b61977f53ccc2",

  fetchWeather(city) {
    if (!city) return;

    document.querySelector(".loading").classList.remove("hidden");
    document.querySelector(".weather").classList.add("hidden");
    document.querySelector(".error").classList.add("hidden");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then(res => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then(data => this.displayWeather(data))
      .catch(() => {
        document.querySelector(".error").innerText = "City not found";
        document.querySelector(".error").classList.remove("hidden");
        document.querySelector(".loading").classList.add("hidden");
      });
  },

  displayWeather(data) {
    document.querySelector(".city").innerText = `Weather in ${data.name}`;
    document.querySelector(".temp").innerText = `${data.main.temp}°C`;
    document.querySelector(".description").innerText = data.weather[0].description;
    document.querySelector(".humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed: ${data.wind.speed} m/s`;

    document.querySelector(".icon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.querySelector(".loading").classList.add("hidden");
    document.querySelector(".weather").classList.remove("hidden");
  },

  search() {
    const city = document.querySelector(".search-bar").value;
    this.fetchWeather(city);
  }
};

document.querySelector("button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", e => {
  if (e.key === "Enter") weather.search();
});

// default city
weather.fetchWeather("Vijayawada");