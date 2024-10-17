import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//import { EmbalsesService } from '../embalses.service';

import { Map, MapStyle, Marker, config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [MapaComponent],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  map: Map | undefined;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  ngOnDestroy(): void {
    this.map?.remove();
  }
  ngAfterViewInit(): void {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    /*
    new Marker({color: "#FF0000"})
      .setLngLat([this.longitude ?? 0, this.latitude ?? 0])
      .addTo(this.map);
    */
  }
  ngOnInit(): void {
    config.apiKey = 'SaTHdLhTVWqORs5dQ7yx';
    /*this.embalseSerice.latitude$.subscribe(latitude => {
      if (latitude !== null) {
        console.log(`Nueva latitud: ${latitude}`);
        // Actualiza el mapa con la nueva latitud
      }
    });

    this.embalseSerice.longitude$.subscribe(longitude => {
      if (longitude !== null) {
        console.log(`Nueva longitud: ${longitude}`);
        // Actualiza el mapa con la nueva longitud
      }
    });*/
  }

  public addMarker(latitude: number, longitude: number): void {
    if (this.map) {
      new Marker({ color: "#FF0000" })
        .setLngLat([longitude, latitude])
        .addTo(this.map);
    }
  }
  
}
