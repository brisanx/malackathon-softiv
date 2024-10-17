import { Injectable } from '@angular/core';
import { Embalse } from './embalse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmbalsesService {
  private embalses: Embalse[] = [
    // Datos de ejemplo
    {
      codigo: 'EB001',
      nombre: 'Embalse de Buendía',
      embalse: 'Buendía',
      x: 40.6754,
      y: -1.9203,
      demarc: 'Cuenca del río Buendía',
      cauce: 'Río Buendía',
      google: 'https://www.google.com/maps/place/40.6754,-1.9203',
      openstreetmap:
        'https://www.openstreetmap.org/?mlat=40.6754&mlon=-1.9203#map=12/40.6754/-1.9203',
      wikidata: 'https://www.wikidata.org/wiki/Q123456',
      provincia: 'Guadalajara',
      ccaa: 'Castilla-La Mancha',
      tipo: 'Reservorio',
      cota_coron: 1200,
      alt_cimien: 1100,
      informe: 'Informe sobre el estado del embalse de Buendía',
    },
    // Otros embalses...
  ];

  constructor(private http: HttpClient) {}

  // Cambia la URL base de la API según sea necesario
  private apiUrl = 'http://localhost:8081/api/v1/embalses';

  getEmbalses(): Embalse[] {
    return this.embalses;
  }

  // Modificación para construir la URL como /latitude/longitude/radio
  getEmbalsesCercanos(latitud: number, longitud: number, numKm: number): Observable<Embalse[]> {
    // Construir la URL con los parámetros en el path
    const url = `${this.apiUrl}/${latitud}/${longitud}/${numKm}/`;
    
    // Realizar la petición HTTP GET a la URL construida
    return this.http.get<Embalse[]>(url);
  }
}
