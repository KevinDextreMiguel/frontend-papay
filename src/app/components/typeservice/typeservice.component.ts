import { Component, OnInit } from '@angular/core';
import { ListartypeserviceComponent } from './listartypeservice/listartypeservice.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-typeservice',
  standalone: true,
  imports: [RouterOutlet,ListartypeserviceComponent],
  templateUrl: './typeservice.component.html',
  styleUrl: './typeservice.component.css'
})
export class TypeserviceComponent implements OnInit{
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {
}}
