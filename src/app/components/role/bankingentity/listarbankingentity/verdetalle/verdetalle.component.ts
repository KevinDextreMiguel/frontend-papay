import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { SinodeletebankingentityComponent } from '../sinodeletebankingentity/sinodeletebankingentity.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankingentityService } from '../../../../services/bankingentity.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-verdetalle',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule,
    MatButtonModule, RouterModule,
    SinodeletebankingentityComponent,
    MatPaginatorModule,
    NgFor,
    MatCardModule,
    FormsModule, // Agrega FormsModule aquí
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './verdetalle.component.html',
  styleUrl: './verdetalle.component.css'
})
export class VerdetalleComponent implements	OnInit{
  displayedColumns: string[] = [
    'nameBankingEntity',
    'descriptionBankingEntity',
    'addressBankingEntity',
    'cellphoneBankingEntity',
    'websiteBankingEntity',
    'headquarterBankingEntity',
    'user',
    'edit',
    'delete'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datos: any[] = []; // Aquí almacenaremos los datos
  id: number = 0
  verdetalle:boolean=false
  constructor(
    private route: ActivatedRoute,
    private bS: BankingentityService,
    public dialog: MatDialog,
    private mS: BankingentityService,

  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.verdetalle = data['id'] != null;
    });
    this.bS.list().subscribe((data) => {
      //this.dataSource.paginator = this.paginator;
      this.datos = data;
    });
    this.bS.getList().subscribe((data) => {
      //this.dataSource=new MatTableDataSource(data)
      //this.dataSource.paginator = this.paginator;
      this.datos = data;
    })
  }

  deleteBanking(id: number): void {
    this.dialog.open(SinodeletebankingentityComponent, { width: '250px' }).afterClosed().subscribe((res) => {
      if (res) {
        this.bS.eliminar(id).subscribe(() => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        })
      }
    });
  }

 
}
