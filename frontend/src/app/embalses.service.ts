import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

interface Embalse {
  id: number;
  nombre: string;
  aguaTotal: number;
  electricoFlag: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmbalsesService {
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
  getEmbalses(): Observable<Embalse[]> {
    // Aquí eventualmente harás la llamada HTTP a tu backend
    return this.http.get<Embalse[]>(this.apiUrl);
  }
  */
  
  getEmbalses(): Observable<Embalse[]> {
    return of([
      { id: 1, nombre: 'Embalse A', aguaTotal: 500, electricoFlag: true },
      { id: 2, nombre: 'Embalse B', aguaTotal: 1000, electricoFlag: false },
      { id: 3, nombre: 'Embalse C', aguaTotal: 750, electricoFlag: true }
    ]);
  }
    
}