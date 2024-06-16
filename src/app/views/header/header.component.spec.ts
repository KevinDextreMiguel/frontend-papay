import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SobrenosotrosComponent } from '../sobrenosotros/sobrenosotros.component';
import { RegistrarComponent } from '../registrar/registrar.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent,RouterLink,HomeComponent,RouterOutlet,SobrenosotrosComponent,RegistrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
