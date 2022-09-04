/* notes on how to handle pulling and presenting weather data

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