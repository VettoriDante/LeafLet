//recupero e creazione delle variabili
const LatI = document.querySelector("#LatI");//latitudine form
const LngI = document.querySelector("#LngI");//longitudine form
const btn = document.querySelector("#submit");//btn form
const mark = document.querySelector("#isMarker");//verifica sull'inserimento del marker in goTo
const rmBtn = document.querySelector("#remove");
let arcipressi = [43.7674522 , 11.2095389];//salvo le coordinate di una posizione
let addedMark = [];
let map = L.map('map')//L chiamata a LeafLet creando la mapp
let map2 = L.map('map2');
let map3 = L.map('map3');
let map4 = L.map('map4');

map.setView([43.7659151, 11.2135399], 15);//tra [latitudine , longitudine] , valore zoom
/*Zoom: valore 0 = pianeta intero , 19 valore massimo di zoom(consigliato) */
map2.setView(arcipressi, 17);
map3.setView(arcipressi, 16);
map4.setView(arcipressi, 15);


//aggiunta del layer
function addDefaultLayer(mappa){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mappa);
}


let m1 = L.marker(arcipressi).addTo(map2);//Uguale a sopra ma non si deve mai usare
//lo stesso marker in 2 mappe (Funziona solo in una e male)
m1.bindPopup("Un semplice marker");
m1.openPopup();


//aggiungo il marker (usati nella prima mappa)
let marker = L.marker([43.7659151, 11.2135399]).addTo(map);
let marker2 = L.marker(arcipressi).addTo(map);
let marker3 = L.marker([43.7656236 , 11.2067503]).addTo(map);

let circle = L.circle(arcipressi, {color: "yellow", radius: 400}).addTo(map);//creazione cerchio
let poligono = [[43.7704297,11.2096006],[43.7644808,11.1999965],[43.7640128,11.2185373]];//creazione array per poligono
let triangle = L.polygon(poligono, {color: "black"}).addTo(map4);//creazione poligono
marker._icon.classList.add("red"); //aggiunge classi al marker
marker3._icon.classList.add("green"); //aggiunge classi al marker
//ono contiene filter:hue-rotate(num deg);
//filter: hue-rotate = letia la tonailtà del colore
marker.bindPopup("<b>Siamo Qui</b><br>4A-IA");
// interagiendo con il marker.bindPopup(stringa).openPopup
//Sintassi Si riferisce da L.metodo.addTo(oggetto)

let link = []; // creo una array contenitore

//aggiungo laitudine e longitudine dei punti da collegare
link.push(marker.getLatLng());
link.push(marker2.getLatLng());
link.push(marker3.getLatLng());

//creo i collegamenti tramite polyline();
let line = L.polyline(link, {color: 'black'}).addTo(map);

//funzione che porta ad una posizione definita dall'utente nel form
function goTo(){
    let tmpA = [LatI.value , LngI.value];
    console.log(mark.checked);
    map.setView(tmpA, 13);
    if(mark.checked){
        let markT = L.marker(tmpA).addTo(map);
        addedMark.push(markT);
    }
}

function removeMarkers(){
    for(let i of addedMark){
        map.removeLayer(i);
    }
}


//Events
addEventListener("DOMContentLoaded" , () => {
    addDefaultLayer(map);
    addDefaultLayer(map2);
    addDefaultLayer(map3);
    addDefaultLayer(map4);
    L.polyline(link, {color: "black"}).addTo(map3);
    L.circle(arcipressi, {color: "yellow", radius: 400}).addTo(map4)
})
btn.addEventListener("click" , goTo);
rmBtn.addEventListener("click", removeMarkers);

//per rimuovere è possibile usare map.removeLayer(oggetto)