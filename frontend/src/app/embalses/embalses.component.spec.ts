import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbalsesComponent } from './embalses.component';

describe('EmbalsesComponent', () => {
  let component: EmbalsesComponent;
  let fixture: ComponentFixture<EmbalsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbalsesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmbalsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
