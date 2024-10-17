import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmbalsesService } from '../embalses.service';
import { MapaComponent } from '../mapa/mapa.component';

interface Embalse {
  id: number;
  nombre: string;
  aguaTotal: number;
  electricoFlag: boolean;
}

@Component({
  selector: 'app-embalses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './embalses.component.html',
  styleUrl: './embalses.component.css'
})
export class EmbalsesComponent implements AfterViewInit{
  embalses: Embalse[] = [];
  @ViewChild(MapaComponent) mapaComponent!: MapaComponent;
  

  constructor(/*private embalseService: EmbalsesService*/) {}
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
  }

  /*
  ngOnInit() {
    this.getEmbalses().subscribe((data: Embalse[]) => {
      this.embalses = data;
    });
  }
  */

  latitude: number | null = null;
  longitude: number | null = null;

  onSubmit(): void {
    if (this.latitude !== null && this.longitude !== null) {
      this.mapaComponent.addMarker(this.latitude, this.longitude);
      console.log(`Latitud: ${this.latitude}, Longitud: ${this.longitude}`);
    }
  }

  getEmbalses(): Observable<Embalse[]> {
    return of([
      { id: 1, nombre: 'Embalse A', aguaTotal: 500, electricoFlag: true },
      { id: 2, nombre: 'Embalse B', aguaTotal: 1000, electricoFlag: false },
      { id: 3, nombre: 'Embalse C', aguaTotal: 750, electricoFlag: true }
    ]);
  }
}
