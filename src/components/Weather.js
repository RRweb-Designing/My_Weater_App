import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";
import logo from '../components/vervelogo.png'

// Weather component
function Weather() {
  // State to store weather data
  const [weather, setWeather] = useState([]);
  // State to store form data (city and country)
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  // API key for OpenWeatherMap
  const APIKEY = "5e855f02195d10eb2bff493d4d9add1f";
  
  // Function to fetch weather data
  async function weatherData(e) {
    e.preventDefault();
    // Check if city input is empty
    if (form.city === "") {
      alert("Add values");
    } else {
      // Fetch weather data from OpenWeatherMap API
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json()) // Convert response to JSON
        .then((data) => data);

      // Set weather state with fetched data
      setWeather({ data: data });
    }
  }

  // Function to handle form input changes
  const handleChange = (e) => {
    let name = e.target.name; // Input field name
    let value = e.target.value; // Input field value

    // Update form state based on input field
    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };

  return (
    // Main component div
    <div className="weather">
      <span className="title">Weather App</span>
      <img src={logo} alt="logo"></img>
      <br />
      {/* Form to input city and country */}
      <form>
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* Render DisplayWeather component if weather data is available */}
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
