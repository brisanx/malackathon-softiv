import { Injectable } from '@angular/core';
import {Embalse } from './embalse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmbalsesService {
  private embalses: Embalse[] = [
    {
        codigo: 'EB001',
        nombre: 'Embalse de Buendía',
        embalse: 'Buendía',
        x: 40.6754,
        y: -1.9203,
        demarc: 'Cuenca del río Buendía',
        cauce: 'Río Buendía',
        google: 'https://www.google.com/maps/place/40.6754,-1.9203',
        openstreetmap: 'https://www.openstreetmap.org/?mlat=40.6754&mlon=-1.9203#map=12/40.6754/-1.9203',
        wikidata: 'https://www.wikidata.org/wiki/Q123456',
        provincia: 'Guadalajara',
        ccaa: 'Castilla-La Mancha',
        tipo: 'Reservorio',
        cota_coron: 1200,
        alt_cimien: 1100,
        informe: 'Informe sobre el estado del embalse de Buendía',
    },
    {
        codigo: 'EB002',
        nombre: 'Embalse de La Serena',
        embalse: 'La Serena',
        x: 39.1620,
        y: -5.0573,
        demarc: 'Cuenca del río Zújar',
        cauce: 'Río Zújar',
        google: 'https://www.google.com/maps/place/39.1620,-5.0573',
        openstreetmap: 'https://www.openstreetmap.org/?mlat=39.1620&mlon=-5.0573#map=12/39.1620/-5.0573',
        wikidata: 'https://www.wikidata.org/wiki/Q654321',
        provincia: 'Badajoz',
        ccaa: 'Extremadura',
        tipo: 'Embalse',
        cota_coron: 950,
        alt_cimien: 840,
        informe: 'Informe sobre el estado del embalse de La Serena',
    },
    {
        codigo: 'EB003',
        nombre: 'Embalse de Alcántara',
        embalse: 'Alcántara',
        x: 39.6104,
        y: -6.3273,
        demarc: 'Cuenca del río Tajo',
        cauce: 'Río Tajo',
        google: 'https://www.google.com/maps/place/39.6104,-6.3273',
        openstreetmap: 'https://www.openstreetmap.org/?mlat=39.6104&mlon=-6.3273#map=12/39.6104/-6.3273',
        wikidata: 'https://www.wikidata.org/wiki/Q987654',
        provincia: 'Cáceres',
        ccaa: 'Extremadura',
        tipo: 'Embalse',
        cota_coron: 400,
        alt_cimien: 350,
        informe: 'Informe sobre el estado del embalse de Alcántara',
    },
];


  constructor(private http: HttpClient) { }
  private apiUrl = 'https://api.embalses.com/embalses';

  getEmbalses(): Embalse [] {
    return this.embalses;
  }



  // Función para obtener embalses cercanos
  getEmbalsesCercanos(latitud: number, longitud: number, numKm: number): Observable<Embalse[]> {
    // Construimos los parámetros para la petición HTTP
    const params = new HttpParams()
      .set('latitud', latitud.toString())
      .set('longitud', longitud.toString())
      .set('radio', numKm.toString());

    // Hacemos la petición GET a la API con los parámetros
    return this.http.get<Embalse[]>(this.apiUrl, { params });
  }
}
