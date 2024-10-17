import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Embalse } from './embalse';

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

  private apiUrl = 'https://la-api-que-me-de-la-alba'; // URL de tu API (cámbiala más adelante)
  private latitudeSource = new BehaviorSubject<number | null>(null);
  private longitudeSource = new BehaviorSubject<number | null>(null);

  latitude$ = this.latitudeSource.asObservable();
  longitude$ = this.longitudeSource.asObservable();

  constructor(private http: HttpClient) {}


  setLatitude(latitude: number): void {
    this.latitudeSource.next(latitude);
  }

  setLongitude(longitude: number): void {
    this.longitudeSource.next(longitude);
  }
  
  /*
  getEmbalsesWithinRadius(latitude: number, longitude: number, radius: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${latitude}&lng=${longitude}&radius=${radius}`;
    return this.http.get<any>(url);
  }
  */

  private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (x: number) => x * Math.PI / 180;
    const R = 6371; // Radio de la Tierra en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  getEmbalsesWithinRadius(latitude: number, longitude: number, radius: number): Observable<Embalse[]> {
    const embalsesWithinRadius = this.embalses.filter(embalse => {
      const distance = this.haversineDistance(latitude, longitude, embalse.x, embalse.y);
      return distance <= radius;
    });
    return of(embalsesWithinRadius);
  }

  /*
  getEmbalses(): Observable<Embalse[]> {
    // Aquí eventualmente harás la llamada HTTP a tu backend
    return this.http.get<Embalse[]>(this.apiUrl);
  }
  */
    
}