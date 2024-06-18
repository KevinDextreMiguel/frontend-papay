import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmovementComponent } from './listarmovement/listarmovement.component';

@Component({
  selector: 'app-movement',
  standalone: true,
  imports: [
    RouterOutlet,
    ListarmovementComponent
  ],
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.css'
})
export class MovementComponent implements OnInit{

  constructor(public route: ActivatedRoute) { }
  
  ngOnInit(): void {
      
  }
}
