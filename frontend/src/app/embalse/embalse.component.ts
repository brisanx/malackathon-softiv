import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Embalse } from '../embalse';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EmbalsesService } from '../embalses.service';

@Component({
  selector: 'app-embalse',
  templateUrl: './embalse.component.html',
  styleUrls: ['./embalse.component.css']
})
export class EmbalseComponent {
  @Input() embalse?: Embalse;
 

  constructor(private embalsesService: EmbalsesService, private modalService: NgbModal) { }

  

}
