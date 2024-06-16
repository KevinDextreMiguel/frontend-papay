import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sobrenosotros',
  standalone: true,
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './sobrenosotros.component.html',
  styleUrl: './sobrenosotros.component.css'
})
export class SobrenosotrosComponent {

}
