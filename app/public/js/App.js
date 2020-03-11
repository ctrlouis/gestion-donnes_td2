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
            markers: []
        }
    },

    methods: {
        initMap() {
            const position = [this.initialPos.latitude, this.initialPos.longitude];
            const zoom = 12;
            this.map = L.map(this.mapId).setView(position, zoom);
            this.tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                }
            );
            this.tileLayer.addTo(this.map);
        },
        initMarkers() {
            let marker, popup;
            this.pins.forEach((pin) => {                
                marker = L.marker([pin.position.latitude, pin.position.longitude]).addTo(this.map);
                popup = '<header>' + pin.name + '</header> <main>' + pin.details + '</main>';
                marker.bindPopup(popup);
                this.markers.push(marker);
            });
        },
        refreshMarkers() {
            this.markers.forEach(marker => this.map.removeLayer(marker));
            while (this.markers.length) this.markers.shift();
            this.initMarkers();
        }
    },

    watch: {
        pins: function(newPins) {            
            this.refreshMarkers();
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
            latitude: 48.6880756,
            longitude: 6.1384176
        },
        pointsInterests: [],

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
            .then((results) => {
                this.setPoints(results.data);
                
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