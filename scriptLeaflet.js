const LatI = document.querySelector("#LatI");
const LngI = document.querySelector("#LngI");
const btn = document.querySelector("#submit");
const mark = document.querySelector("#isMarker");
let link = [];
let arcipressi = [43.7674522 , 11.2095389];
let map = L.map('map')//L chiamata a LeafLet poi Bo
map.setView([43.7659151, 11.2135399], 15);//tra [latitudine , longitudine] , valore zoom
/*Zoom: valore 0 = pianeta intero , 19 valore massimo di zoom(consigliato) */

//aggiunta del layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//aggiungo il marker
let marker = L.marker([43.7659151, 11.2135399]).addTo(map);
let marker2 = L.marker(arcipressi).addTo(map);
let marker3 = L.marker([43.7656236 , 11.2067503]).addTo(map);
link.push(marker.getLatLng());
link.push(marker2.getLatLng());
link.push(marker3.getLatLng());
let circle = L.circle(arcipressi, {color: "yellow", radius: 400}).addTo(map);
marker._icon.classList.add("red"); //aggiunge classi al marker
marker3._icon.classList.add("green"); //aggiunge classi al marker
//ono contiene filter:hue-rotate(num deg);
//filter: hue-rotate = letia la tonailtà del colore
marker.bindPopup("<b>Siamo Qui</b><br>4A-IA");
let line = L.polyline(link, {color: 'black'}).addTo(map);
// interagiendo con il marker.bindPopup(stringa).openPopup
//Sintassi Si riferisce da L.metodo.addTo(oggetto)

function goTo(){
    let tmpA = [LatI.value , LngI.value];
    console.log(mark.checked);
    map.setView(tmpA, 13);
    if(mark.checked){
        let markT = L.marker(tmpA).addTo(map);
    }
}

btn.addEventListener("click" , goTo);