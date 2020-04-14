const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)


searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitudes = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitudes: latitudes,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})

const location = document.querySelector('[data-location]')
const status = document.querySelector('[data-status]')
const temperature = document.querySelector('[data-temperature]')
const precipitation = document.querySelector('[data-precipitationElement]')
const windSpeed = document.querySelector('[data-wind]')

function setWeatherData(data, place) {
    //console.log(place)
    //console.log(data.weather.description)
    location.textContent = place
    status.textContent = data.weather.description
    temperature.textContent = data.app_temp
    windSpeed.textContent = data.wind_spd
    precipitation.textContent = data.precip
    
}
