//Mapa: https://leafletjs.com/examples/quick-start/
//IP: https://geo.ipify.org/docs

//Mapa:
let map = L.map('map').setView([51.01, 0], 13);
let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF0aWFzbG9uZ28iLCJhIjoiY2t5cXF0MW5jMG1uOTJ2b3k3NWN1cjgxYyJ9.-0waMn3V1URyJiRN3d0USQ', {
    maxZoom: 25,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
let marker = L.marker([51.01, 0]).addTo(map);
map.removeControl(map.zoomControl); //Remueve botones +- de Zoom

//JS:
const form = document.querySelector('.form')
const input = document.querySelector('.form__input')
const display = document.querySelectorAll('.display__subtitle')
const regIp = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/
let rta = ''

form.addEventListener('submit', e => {
    e.preventDefault()
    if (regIp.test(input.value)) {
        display[0].innerHTML = input.value
        console.log(true)

        xhr = new XMLHttpRequest
        xhr.open('get', 'https://geo.ipify.org/api/v2/country,city?apiKey=at_g5L7iSPPijgYYPWXBsV5HoWIXPWQS&ipAddress=' + input.value)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                rta = JSON.parse(xhr.response)
                display[1].innerHTML = `${rta.location.city}, ${rta.location.region}`
                display[2].innerHTML = `UTC ${rta.location.timezone}`
                display[3].innerHTML = rta.isp
                map.setView([rta.location.lat, rta.location.lng], 13)
                let marker1 = L.marker([rta.location.lat, rta.location.lng]).addTo(map);
            } else {
                console.error('Algo falló', xhr.status);
            }
        });
        xhr.send()
    }
    else {
        console.log(false)
    }
})







