
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { routes } from '../../../../core/helpers/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-leaflet',
    templateUrl: './leaflet.component.html',
    styleUrl: './leaflet.component.scss',
    imports: [RouterLink]
})
export class LeafletComponent  implements OnInit {
    routes = routes;
  ngOnInit() {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add a marker
    L.marker([51.505, -0.09]).addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();

      var shapesmap = L.map('map1').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(shapesmap);
    var marker = L.marker([51.5, -0.09]).addTo(shapesmap);
    var circle = L.circle([51.508, -0.11], {
        color: '#d77cf7',
        fillColor: '#d77cf7',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(shapesmap);
    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ], {
        color: "#fe5454",
        fillColor: "#fe5454"
    }).addTo(shapesmap);

    /* maps with popup */
    var popupmap = L.map('map-popup').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(popupmap);
    var marker = L.marker([51.5, -0.09]).addTo(popupmap);
    var circle = L.circle([51.508, -0.11], {
        color: '#ffc102',
        fillColor: '#ffc102',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(popupmap);
    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ], {
        color: "#7b76fe",
        fillColor: "#7b76fe"
    }).addTo(popupmap);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");
    var popup = L.popup()
        .setLatLng([51.513, -0.09])
        .setContent("I am a standalone popup.")
        .openOn(popupmap);

    /* maps with custom icon */
    var customicon = L.map('map-custom-icon').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(customicon);
    var greenIcon = L.icon({
        iconUrl: 'assets/img/logo.svg',
        iconSize: [80, 25], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([51.5, -0.09], { icon: greenIcon }).addTo(customicon);

    var geomap = L.map('interactive-map').setView([37.8, -96], 4);
    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(geomap);
    // L.geoJson(statesData).addTo(geomap);

  }
}
