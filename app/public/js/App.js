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
                }
            );
            this.tileLayer.addTo(this.map);
        },
        initMarkers() {

            // L.control.layers(null, this.overlayMaps).addTo(this.map);

            // let marker, popup;
            // this.pins.forEach((pin) => {
            //     marker = L.marker([pin.position.latitude, pin.position.longitude]).addTo(this.map);
            //     popup = '<header>' + pin.name + '</header><hr><main>' + pin.details + '</main>';
            //     marker.bindPopup(popup);
            //     this.markers.push(marker);
            // });

            let marker, popup;
            let group = [];
            this.pins.forEach((pin) => {
                marker = L.marker([pin.position.latitude, pin.position.longitude]);
                popup = `
                    <header>${pin.name}</header>
                    <hr>
                    <main>${pin.details}</main>`;
                marker.bindPopup(popup);
                group.push(marker);
            });
            const school = L.layerGroup(group).addTo(this.map);

            var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.');

            var cities = L.layerGroup([littleton]).addTo(this.map);

            this.overlayMaps = {
                "Cities": cities,
                "School": school
            };
            L.control.layers({}, this.overlayMaps).addTo(this.map);
        },
        randomColor() {
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        }
    },

    mounted() {
        this.initMap();
        this.initMarkers();
    }
});

const App = new Vue({
    el: '#app',

    components: { Mapp },

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