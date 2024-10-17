import { Injectable } from '@angular/core';
import {Embalse } from './embalse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmbalsesService {
  private embalses: Embalse [] = [
    {id: 1, nombre: 'Juan', apellidos: 'Pérez', email: 'perez@uma.es', telefono: '666666666'},
    {id: 2, nombre: 'Ana', apellidos: 'García', email: 'ana@uma.es', telefono: '55555555'},
    {id: 3, nombre: 'Luis', apellidos: 'González', email: 'gonzalez@uma.es', telefono: '444444444'},
  ];

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://api.embalses.com/embalses';

  getEmbalses(): Embalse [] {
    return this.embalses;
  }

  addEmbalse(embalse: Embalse) {
    embalse.id = Math.max(...this.embalses.map(c => c.id)) + 1;
    this.embalses.push(embalse);
  }

  editarEmbalse(embalse: Embalse) {
    let indice = this.embalses.findIndex(c => c.id == embalse.id);
    this.embalses[indice] = embalse;
  }

  eliminarEmbalse(id: number) {
    let indice = this.embalses.findIndex(c => c.id == id);
    this.embalses.splice(indice, 1);
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
