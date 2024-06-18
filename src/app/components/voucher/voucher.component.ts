import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ListarvoucherComponent } from './listarvoucher/listarvoucher.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [RouterOutlet,ListarvoucherComponent,RouterModule,MatToolbarModule,MatButtonModule,MatIconModule],
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.css'
})
export class VoucherComponent implements OnInit{
  constructor(public route:ActivatedRoute) {}
 ngOnInit(): void {
     
 }
}
