/* notes on how to handle pulling and presenting weather data


Geocoding API:

http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

One call API:

https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

Pull input data from search bar, insert into call for weather data 
read api doc to see how to convert lat/long

3 things happen once receive promise from fetch.
    (technically 4 if you count clearing out the search bar input)
1. button is added to saved city div (recent cities) with name of the searched city displayed.
    -this button will be saved in localStorage so that when page reloads, client's
    selections are saved
2. City current info div is populated with the following weather data:
    -City name, local time (moment JS?), and a little icon with current status (cloud, sunny, rainy, etc.)
    -temp
    -wind speed
    -humidity
    -uv index (in a little colored button with colored background for whether uv is good or dangerous)    
3. 5-day forecast populates with following data:
    - date
    -weather status icon
    -wind speed
    -humidity
        Eric's suggestion: hard code the cards/divs for the 5 days, give ids. 
            that way targetting the piece is easy, throw data in. 


Breakdown of 1.
    need to add event listener to search button and pull input value
    pass input value into API call for geocoding (lat/long)
    pass that lat/long into weather api
    use string interpolation (read mdn docs from Eric)
    grab requested data



    onclick function to grab lat/long and pass into next function
    -create a subfunction for: 
        -setting innertext/values of city info/5day forecast to blank
        -set city name header to "loading"
    -then set all the values to pulled data

    function for apicall for weather data object


 */

var appid = "8e0314ddd129d7fc7871d6bdb2b3bf0a";
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector("#city");
var cityCurrentEl = document.querySelector("#city-current");
var cityButtonsEl = document.querySelector("#city-buttons");

// Step 1 - grab city name from user
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim(); // should add in split by space/strip out commas to grab state name as well as city name. Create variable for statename as well as city name
  
    if (cityName) {
        console.log(cityName);
      getCityData(cityName); // This needs to pass the city name into the geocoder api
      createCityButton(cityName); // this passes city name into the button creator

      cityCurrentEl.textContent = ''; // this should clear out the div with the current city info. If not, update and change.
      cityInputEl.value = ''; // clears out text input
    } else {
      alert('Please enter a city name');
    }
  };

  var buttonSubmitHandler = function (event) {
    event.preventDefault();
    var savedButtonCity = event.target.getAttribute("data-city");
    console.log(savedButtonCity);

  };

  var createCityButton = function(city) {
    var cityButton = document.createElement("button");
    $(cityButton).addClass("btn btn-secondary text-nowrap");
    $(cityButton).attr("data-city", city);
    $(cityButton).text(city);
    $(cityButtonsEl).append(cityButton);
  };

  var getCityData = function(city) {
    // geocoding api - will give latitude/longitude for given city
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + appid; // check docs about using string interpolation here instead


    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(data[0].lat, data[0].lon);
        //   displayCityWeather(data, city); <-- need to create function for taking lat and long data and doing next API fetch
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Geocoding API');
    });
};
  

  userFormEl.addEventListener('submit', formSubmitHandler);
  cityButtonsEl.addEventListener("click", buttonSubmitHandler);