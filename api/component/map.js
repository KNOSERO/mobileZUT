/**
 * Klasa odpowiadająca za dopasowywanie html mapy
 */
class Map {

    /**
     * Tworzenie html podstawowej mapy z lokalizacją w centrum szczecina jak i lokalizacją osoby 
     * 
     * @param {*} width Szerokość okna mapy standardowo ustawiona na 600px
     * @param {*} height Wysokość okna standardowo ustawiona na 400px
     */
    constructor(width = `600px`, height = `400px`) {

        this._width = width;
        this._height = height;

        this.setView(`[53.432792, 14.548066], 15`);
        this.marker(`[53.432792, 14.548066]`);
        this.cyrcle(`[53.432792, 14.548066]`);
        this.body();
        this.header();
    }

    /**
     * Tworzenie Body html
     */
    body() {
        /**
         * body html
         */
        this._body = `
        <body>
        <div id="mapid" style="width: ${this._width}}; height: ${this._height};"></div>
        <script>
        
            ${this._view}

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                    'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1
            }).addTo(mymap);
        
            ${this._marker}
            ${this._cyrcle}
        
            var popup = L.popup();
        
            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(mymap);
            }
        
            mymap.on('click', onMapClick);
        
        </script>
        
        
        
        </body>
        </html>
        `
    }

     /**
     * Tworzenie zaokrąglenia miejsca pobytu
     * 
     * @param {*} location Lokalizacja np. `[53.432792, 14.548066]`
     * @param {*} description Informacje dodatkowe standardowo ustawione na brak
     */
    cyrcle(location, cyrcle=`100`, description = `brak`) {
        /**
         * zaokrąglenie miejsca pobytu
         */
        this._cyrcle = `
                            L.circle(${location}, ${cyrcle}, {
                                color: 'red',
                                fillColor: '#f03',
                                fillOpacity: 0.5
                            }).addTo(mymap).bindPopup("${description}");
                        `
        return this;
    }

    /**
     * Tworzenie nagłowka Html
     */
    header() {
         /**
         * Nagłowek html
         */
        this._header = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Quick Start - Leaflet</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
        </head>
        `
    }

    /**
     * Tworzenie znacznika zaznaczanie markerem miejsca docelowego
     * 
     * @param {*} location Lokalizacja np. `[53.432792, 14.548066]`
     * @param {*} description Informacje dodatkowe standardowo ustawione na brak
     */
    marker(location, description = `brak`) {
        /**
         * znacznik zaznaczanie markerem miejsca docelowego
         */
        this._marker = `    
                            L.marker(${location}).addTo(mymap)
                            .bindPopup("${description}").openPopup();
                        `;
        return this;
    }

    /**
     * 
     * Wyswietlania miejsca mapy
     * 
     * @param {*} location Lokalizacja mapy np. `[53.432792, 14.548066], 15`
     */
    setView(location) {
        /**
         * 
         */
        this._view = `  
                        var mymap = L.map('mapid').setView(${location}, 13);
                     `
        return this;
    }

    /**
     * Zwraca przerobiony html html 
     */
    return() {
        this.body();
        return `${this._header}
                ${this._body}`
    }
}

export default Map