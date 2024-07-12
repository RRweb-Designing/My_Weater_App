import React from "react";
import "./displayweather.css";

// DisplayWeather component which receives 'props' as an argument
function DisplayWeather(props) {
  // Destructuring 'data' from props
  const { data } = props;

  // Constructing the URL for the weather icon
  const iconurl =
    "http://openweathermap.org/img/wn/" +
    `${data.cod !== 404 ? data.weather[0].icon : null}` +
    ".png";

  return (
    <div className="displayweather">
      {data.cod !== 404 ? ( // If data is available and the city is found
        <React.Fragment>
          <div className="maincard">
            <span className="cardtitle">
              {data.name} , {data.sys.country}. Weather
            </span>
            <span className="cardsubtitle">
              As of {new Date().toLocaleTimeString()} {/* Displaying current time */}
            </span>

            <h1>
              {" "}
              {Math.floor(data.main.temp - 273.15)} {/* Converting temperature from Kelvin to Celsius */}
              <sup>o</sup>
            </h1>
            <span className="weather-main">{data.weather[0].main}</span> {/* Main weather condition */}
            <img className="weather-icon" src={iconurl} alt="" srcSet="" /> {/* Weather icon */}
            <span className="weather-description">
              {" "}
              {data.weather[0].description} {/* Weather description */}
            </span>
          </div>
          <div className="weatherdetails">
            <div className="section1">
              <table>
                <tbody>
                <tr>
                  <td>
                    <h4>High/Low</h4>
                  </td>
                  <td>
                    <span>
                      {Math.floor(data.main.temp_max - 273.15)}/ {/* Max temperature */}
                      {Math.floor(data.main.temp_min - 273.15)} {/* Min temperature */}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Humidity</h4>
                  </td>
                  <td>
                    <span>{data.main.humidity} %</span> {/* Humidity */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Pressure</h4>
                  </td>
                  <td>
                    <span>{data.main.pressure} hPa</span> {/* Atmospheric pressure */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Visibility</h4>
                  </td>
                  <td>
                    <span>{data.visibility / 1000} Km</span> {/* Visibility in kilometers */}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div className="section2">
              <table>
                <tbody>
                <tr>
                  <td>
                    <h4>Wind</h4>
                  </td>
                  <td>
                    <span>{Math.floor((data.wind.speed * 18) / 5)} km/hr</span> {/* Wind speed in km/hr */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Wind Direction</h4>
                  </td>
                  <td>
                    <span>
                      {data.wind.deg}
                      <sup>o</sup> deg {/* Wind direction in degrees */}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Sunrise</h4>
                  </td>
                  <td>
                    <span>
                      {new Date(data.sys.sunrise * 1000).toLocaleTimeString()} {/* Sunrise time */}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Sunset</h4>
                  </td>
                  <td>
                    <span>
                      {new Date(data.sys.sunset * 1000).toLocaleTimeString()} {/* Sunset time */}
                    </span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      ) : ( // If city is not found
        <div className="maincard">
          <h2>{data.message}</h2> {/* Display error message */}
        </div>
      )}
    </div>
  );
}

export default DisplayWeather;
