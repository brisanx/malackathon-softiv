import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { FormsModule } from '@angular/forms';
import { Map, MapStyle, Marker, config, Popup } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { debounce } from 'lodash';
import { EmbalsesService } from '../embalses.service'; // Importa el servicio
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient
import { appConfig } from '../app.config';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [FormsModule],
  providers: [EmbalsesService],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit, OnDestroy {
  latitude: number | null = null;
  longitude: number | null = null;
  radius: number = 10; // Valor inicial del radio en km
  map: Map | undefined;
  markers: Marker[] = []; // Array para almacenar los marcadores

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private embalsesService: EmbalsesService // Inyecta el servicio
  ) {
    this.updateCircle = debounce(this.updateCircle, 300); // Debounce de 300ms
  }

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnDestroy(): void {
    this.map?.remove();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.initializeMap();
      }, (error) => {
        console.error('Error obteniendo la ubicación del usuario', error);
        // Usa valores por defecto si no se puede obtener la ubicación
        this.latitude = -4.0;
        this.longitude = 36.0;
        this.initializeMap();
      });
    }
  }

  ngOnInit(): void {
    config.apiKey = 'SaTHdLhTVWqORs5dQ7yx';
  }

  private initializeMap(): void {
    const initialState = { lng: this.longitude ?? 36.0, lat: this.latitude ?? -4.0, zoom: 14 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    this.map.on('load', () => {
      if (this.latitude !== null && this.longitude !== null) {
        this.addCircle(this.latitude, this.longitude, this.radius * 1000); // Convertir km a metros
        this.fetchEmbalses(); // Llama a fetchEmbalses al cargar el mapa
      }
    });
  }

  public addMarker(latitude: number, longitude: number, embalse: any): void {
    if (this.map) {
      // Crear el elemento DOM para el marcador
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(https://docs.maptiler.com/sdk-js/assets/washington-monument.jpg)';
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';

      // Crear el popup
      const popup = new Popup({ offset: 25 }).setHTML(
        `<h3>${embalse.nombre}</h3>
         <p><strong>Embalse:</strong> ${embalse.embalse}</p>
         <p><strong>Provincia:</strong> ${embalse.provincia}</p>
         <p><strong>CCAA:</strong> ${embalse.ccaa}</p>`
      );

      // Crear el marcador
      const marker = new Marker({ element: el })
        .setLngLat([longitude, latitude])
        .setPopup(popup) // Añadir el popup al marcador
        .addTo(this.map);

      this.markers.push(marker); // Añadir el marcador al array
    }
  }

  public updateCircle(): void {
    if (this.latitude !== null && this.longitude !== null) {
      this.addCircle(this.latitude, this.longitude, this.radius * 1000); // Convertir km a metros
      this.fetchEmbalses(); // Llama a fetchEmbalses al actualizar el círculo
    }
  }

  onSubmit(): void {
    if (this.latitude !== null && this.longitude !== null) {
      // Pasa un objeto vacío como tercer argumento
      this.addMarker(this.latitude, this.longitude, {});
      console.log(`Latitud: ${this.latitude}, Longitud: ${this.longitude}`);
    }
  }

  private fetchEmbalses(): void {
    if (this.latitude !== null && this.longitude !== null) {
      this.embalsesService.getEmbalsesWithinRadius(this.latitude, this.longitude, this.radius)
        .subscribe((data) => {
          this.updateMapWithEmbalses(data);
        }, (error) => {
          console.error('Error obteniendo los embalses', error);
        });
    }
  }

  private updateMapWithEmbalses(embalses: any): void {
    // Eliminar todos los marcadores existentes
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Añadir nuevos marcadores
    if (this.map) {
      embalses.forEach((embalse: any) => {
        this.addMarker(embalse.x, embalse.y, embalse);
      });
    }
  }

  private createCircleGeoJSON(center: [number, number], radius: number): GeoJSON.FeatureCollection {
    const points = 100;
    const coordinates: [number, number][] = [];
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * 2 * Math.PI;
      const dx = radius * Math.cos(angle);
      const dy = radius * Math.sin(angle);
      const lng = center[0] + (dx / 111320);
      const lat = center[1] + (dy / 110540);
      coordinates.push([lng, lat]);
    }
    coordinates.push(coordinates[0]);
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coordinates]
          },
          properties: {}
        }
      ]
    };
  }

  public addCircle(latitude: number, longitude: number, radius: number): void {
    if (this.map) {
      // Eliminar la capa y la fuente existentes si ya están presentes
      if (this.map.getLayer('circle-markers')) {
        this.map.removeLayer('circle-markers');
      }
      if (this.map.getSource('geojson-data')) {
        this.map.removeSource('geojson-data');
      }

      const geojson = this.createCircleGeoJSON([longitude, latitude], radius);
      this.map.addSource('geojson-data', {
        type: 'geojson',
        data: geojson
      });
      this.map.addLayer({
        id: 'circle-markers',
        type: 'fill',
        source: 'geojson-data',
        paint: {
          'fill-color': '#ADD8E6', // Cambia el color a azul claro
          'fill-opacity': 0.5 // Ajusta la opacidad para que sea más transparente
        }
      });
    }
  }
}