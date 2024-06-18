import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarbankingentityComponent } from './listarbankingentity/listarbankingentity.component';

@Component({
  selector: 'app-bankingentity',
  standalone: true,
  imports: [RouterOutlet,ListarbankingentityComponent],
  templateUrl: './bankingentity.component.html',
  styleUrl: './bankingentity.component.css'
})
export class BankingentityComponent implements OnInit{
  
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {
      
  }
}
