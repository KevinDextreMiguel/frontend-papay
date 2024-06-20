import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaraccountbankingComponent } from './listaraccountbanking/listaraccountbanking.component';


@Component({
  selector: 'app-accountbanking',
  standalone: true,
  imports: [RouterOutlet, ListaraccountbankingComponent],
  templateUrl: './accountbanking.component.html',
  styleUrl: './accountbanking.component.css'
})
export class AccountbankingComponent implements OnInit{
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {
      
  }
}
