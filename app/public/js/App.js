"use strict";

// import Mapp from './components/mapp.js';


const Mapp = Vue.component('mapp', {
    template: `
    <div :id="mapId" class="map"></div>
    `,

    props: ['initialPos', 'pins'],

    data() {
        return {
            map: 'My Map',
            titleLayer: null,
            layers: [],
            mapId: 'mymap',
            markers: [],
            layers: null,
            overlayMaps: {}
        }
    },

    methods: {
        initMap() {
            const position = [this.initialPos.latitude, this.initialPos.longitude];
            const zoom = 14;

            this.map = L.map(this.mapId, {
                center: position,
                zoom: zoom
            });

            this.tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
            });
            this.tileLayer.addTo(this.map);
        },
        initMarkers() {
            let marker, popup;
            let bikes = [],
                monuments = [],
                schools = [],
                parkings = [],
                others = [];

            this.pins.forEach((pin) => {
                marker = L.marker([pin.position.latitude, pin.position.longitude]).bindPopup(this.generatePopup(pin));

                switch (pin.categorie) {
                    case "velostan":
                        bikes.push(marker);
                        break;
                    case "ecole":
                        schools.push(marker);
                        break;
                    case "monument":
                        monuments.push(marker);
                        break;
                    case "parking":
                        parkings.push(marker);
                        break;

                    default:
                        others.push(marker);
                        break;
                }
            });

            const schoolsLayer = L.layerGroup(schools).addTo(this.map);
            const bikesLayer = L.layerGroup(bikes).addTo(this.map);
            const monumentsLayer = L.layerGroup(monuments).addTo(this.map);
            const parkingsLayer = L.layerGroup(parkings).addTo(this.map);
            const othersLayer = L.layerGroup(others).addTo(this.map);

            this.overlayMaps = {
                "Ecoles": schoolsLayer,
                "Velo Stan": bikesLayer,
                "Monuments": monumentsLayer,
                "Parkings": parkingsLayer,
                "Autres": othersLayer
            };
            L.control.layers({}, this.overlayMaps).addTo(this.map);
        },
        generatePopup(data) {
            let popup = `
            <header>${data.name}</header>
            <hr>
            <main>`;

            if (data.details) {
                popup += `<p>${data.details}</p>`;
            }

            if (data.adresse) {
                popup += `<p class="adresse">${data.adresse}</p>`;
            }

            if (data.infos.hours.start) {
                popup += `<p>Horaire: ${data.infos.hours.start} - ${data.infos.hours.end}</p>`;
            }

            if (data.infos.url) {
                popup += `<a href="${data.infos.url}" target="_blank">Lien vers le site</a>`;
            }

            popup += `</main>`;

            return popup;
        },
        randomColor() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        }
    },

    mounted() {
        this.initMap();
        this.initMarkers();
    }
});

const App = new Vue({
    el: '#app',

    components: {
        Mapp
    },

    data: {
        initialPosition: {
            latitude: 48.693009,
            longitude: 6.1815483
        },
        pointsInterests: null,

        api: {
            localisation: {
                url: 'http://localhost:3000'
            }
        }
    },

    methods: {
        fetchPoints() {
            const url = this.api.localisation.url + '/points';
            axios.get(url)
                .then((res) => {
                    // this.setPoints(res.data);
                    this.pointsInterests = res.data;
                }).catch((err) => {
                    console.error(err);
                });
        },
        setPoints(points) {
            points.forEach(point => this.pointsInterests.push(point));
        }
    },

    created() {
        this.fetchPoints();
    }
});

export default App;