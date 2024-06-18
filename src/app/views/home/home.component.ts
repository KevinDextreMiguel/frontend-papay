import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent,
    LoginComponent,
    RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
