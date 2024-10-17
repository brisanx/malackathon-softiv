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
  embalses: Embalse[] = [];        // Array to hold the embalses data
  embalseElegido?: Embalse;        // To store the selected embalse
  numKm: number = 0;               // Input from the user for radius in kilometers
  isLoading: boolean = false;      // Tracks loading state
  searchPerformed: boolean = false;// Tracks whether the search has been performed
  errorMessage: string = '';       // To store error messages

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

  // Function to fetch embalses based on user location and selected radius
  getEmbalsesCercanos(): void {
    this.errorMessage = '';  // Clear any previous error messages
    this.searchPerformed = false;  // Reset search state

    // Input validation
    if (this.numKm < 0 || this.numKm > 5000) {
      this.errorMessage = 'Por favor, introduce un número entre 0 y 5000 km.';
      return;  // Exit the function if validation fails
    }

    // Set loading to true when starting the search
    this.isLoading = true;

    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;

        // Call the service to get nearby embalses
        this.embalsesService.getEmbalsesCercanos(latitud, longitud, this.numKm).subscribe(
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
}
