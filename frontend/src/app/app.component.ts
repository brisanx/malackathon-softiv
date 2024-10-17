import { Component, OnInit } from '@angular/core';
import { Embalse } from './embalse';
import { EmbalsesService } from './embalses.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  embalses: Embalse[] = [];          // Array to hold the embalses data
  embalseElegido?: Embalse;          // To store the selected embalse
  numKm: number = 0;                 // Input from the user for radius in kilometers
  latitude: string = '';              // User-provided latitude
  longitude: string = '';             // User-provided longitude
  isLoading: boolean = false;        // Tracks loading state
  searchPerformed: boolean = false;  // Tracks whether the search has been performed
  errorMessage: string = '';         // To store error messages
  showCoordinatesInput: boolean = false; // Flag to show coordinate input fields

  constructor(
    private embalsesService: EmbalsesService, 
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Initially, we load the default embalses
    this.embalses = this.embalsesService.getEmbalses();
  }

  // Function to select an embalse from the list
  elegirEmbalse(embalse: Embalse): void {
    this.embalseElegido = embalse;
  }

  // Function to validate the latitude and longitude inputs
  validateCoordinates(): boolean {
    const lat = parseFloat(this.latitude);
    const lon = parseFloat(this.longitude);
    
    // Check if the coordinates are within Spain's borders
    const isValidLatitude = lat >= 35.9 && lat <= 43.7; // Latitude range for Spain
    const isValidLongitude = lon >= -9.3 && lon <= 4.3; // Longitude range for Spain

    if (!isValidLatitude || !isValidLongitude) {
      this.errorMessage = 'Por favor, introduce coordenadas válidas dentro de las fronteras de España: latitud entre 35.9 y 43.7, longitud entre -9.3 y 4.3.';
      return false;
    }
    
    this.errorMessage = ''; // Clear any error message if valid
    return true;
  }

  // Function to fetch embalses based on user location or provided coordinates and selected radius
  getEmbalsesCercanos(): void {
    this.errorMessage = '';  // Clear any previous error messages
    this.searchPerformed = false;  // Reset search state

    // Input validation for radius
    if (this.numKm < 0 || this.numKm > 5000) {
      this.errorMessage = 'Por favor, introduce un número entre 0 y 5000 km.';
      return;  // Exit the function if validation fails
    }

    // Validate user-provided coordinates if visible
    if (this.showCoordinatesInput && !this.validateCoordinates()) {
      return; // Exit if the coordinates are invalid
    }

    // Set loading to true when starting the search
    this.isLoading = true;

    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;

        // Call the service to get nearby embalses using user-provided or geolocation coordinates
        const searchLat = this.showCoordinatesInput ? parseFloat(this.latitude) : latitud;
        const searchLon = this.showCoordinatesInput ? parseFloat(this.longitude) : longitud;

        this.embalsesService.getEmbalsesCercanos(searchLat, searchLon, this.numKm).subscribe(
          (data: Embalse[]) => {
            this.embalses = data;  // Store the embalses data
            this.isLoading = false;  // Stop loading once data is received
            this.searchPerformed = true;  // Mark that the search was performed

            // If no embalses are found, clear the selected embalse
            if (this.embalses.length === 0) {
              this.embalseElegido = undefined;
            }
          },
          (error) => {
            console.error('Error al obtener embalses cercanos:', error);
            this.isLoading = false;  // Stop loading in case of error
            this.searchPerformed = true;
          }
        );
      }, (error) => {
        console.error('Error al obtener la localización:', error);
        this.isLoading = false;  // Stop loading in case of error
        this.searchPerformed = true;
      });
    } else {
      console.error('Geolocalización no soportada por el navegador');
      this.isLoading = false;
      this.searchPerformed = true;
    }
  }

  // Function to toggle the coordinate input visibility
  toggleCoordinateInput(): void {
    this.showCoordinatesInput = !this.showCoordinatesInput; // Toggle the flag
  }
}
