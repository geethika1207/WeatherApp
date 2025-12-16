let weather = {
  apiKey: "708e7fd59bd92264d03b61977f53ccc2",

  // Fetch weather using city name
  fetchWeather: function(city) {
    city = city.trim(); // remove leading/trailing spaces
    if (!city) return;

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
    )
    .then(response => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then(data => this.displayWeather(data))
    .catch(error => console.error(error));
  },

  // Display weather data in HTML
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".icon").alt = description;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed.toFixed(1) + " m/s";
    // Fixed background image
    document.body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')";
  },

  // Called when search is triggered
  search: function() {
    const city = document.querySelector(".search-bar").value;
    this.fetchWeather(city);
  },
};

// Event listeners
document.querySelector(".search button").addEventListener("click", function() {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Fetch default city (Tokyo) on page load
weather.fetchWeather("Vijayawada");
