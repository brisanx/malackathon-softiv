import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmbalsesComponent } from "./embalses/embalses.component";
import { MapaComponent } from "./mapa/mapa.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmbalsesComponent, MapaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
