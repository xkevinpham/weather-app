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

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitationElement]')
const windElement = document.querySelector('[data-wind]')

function setWeatherData(data, place) {
    //console.log(place)
    //console.log(data.weather.description)
    locationElement.textContent = place
    statusElement.textContent = data.weather.description
    temperatureElement.textContent = data.app_temp
    windElement.textContent = data.wind_spd
    precipitationElement.textContent = data.precip
    
}
