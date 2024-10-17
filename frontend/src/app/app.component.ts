import { Component, OnInit } from '@angular/core';
import { Embalse } from './embalse';
import { EmbalsesService } from './embalses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  embalses: Embalse[] = [];
  embalseElegido?: Embalse;
  numKm: number = 0;
  latitude: string = '';  // User-provided latitude
  longitude: string = ''; // User-provided longitude
  isLoading: boolean = false;
  searchPerformed: boolean = false;
  errorMessage: string = '';

  constructor(private embalsesService: EmbalsesService) {}

  ngOnInit(): void {
    // Initially, we can load the embalses if needed
    this.embalses = this.embalsesService.getEmbalses();
  }

  // Function to validate coordinates
  validateCoordinates(): boolean {
    const lat = parseFloat(this.latitude);
    const lon = parseFloat(this.longitude);
    const isValidLatitude = lat >= 35.9 && lat <= 43.7;
    const isValidLongitude = lon >= -9.3 && lon <= 4.3;

    if (!isValidLatitude || !isValidLongitude) {
      this.errorMessage = `Coordenadas no válidas. La latitud debe estar entre 35.9 y 43.7, y la longitud entre -9.3 y 4.3.`;
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  // Fetch embalses based on user-provided latitude, longitude, and numKm
  getEmbalsesCercanos(): void {
    this.errorMessage = '';
    this.searchPerformed = false;

    // Validate numKm
    if (this.numKm < 0 || this.numKm > 5000) {
      this.errorMessage = 'Por favor, introduce un número entre 0 y 5000 km.';
      return;
    }

    // Validate coordinates
    if (!this.validateCoordinates()) {
      return;
    }

    this.isLoading = true;

    const lat = parseFloat(this.latitude);
    const lon = parseFloat(this.longitude);
    this.searchEmbalses(lat, lon);
  }

  // Function to handle embalse search and API call
  private searchEmbalses(lat: number, lon: number): void {
    this.embalsesService.getEmbalsesCercanos(lat, lon, this.numKm).subscribe(
      (data: Embalse[]) => {
        this.embalses = data;
        this.isLoading = false;
        this.searchPerformed = true;

        // Clear selected embalse if no results
        if (this.embalses.length === 0) {
          this.embalseElegido = undefined;
        }
      },
      (error) => {
        this.errorMessage = 'Error al obtener embalses cercanos.';
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  // Select embalse
  elegirEmbalse(embalse: Embalse): void {
    this.embalseElegido = embalse;
  }
}
