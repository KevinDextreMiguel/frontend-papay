import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Bankingentity } from '../../../models/bankingentity';
import { BankingentityService } from '../../../services/bankingentity.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SinodeletebankingentityComponent } from './sinodeletebankingentity/sinodeletebankingentity.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa

@Component({
  selector: 'app-listarbankingentity',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule,
    MatButtonModule, RouterModule,
    SinodeletebankingentityComponent,
    MatPaginatorModule,
    NgFor,
    MatCardModule,
    RouterLink,
    FormsModule, // Agrega FormsModule aquí
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './listarbankingentity.component.html',
  styleUrl: './listarbankingentity.component.css'
})
export class ListarbankingentityComponent implements OnInit{
  displayedColumns: string[] = [
    'idBankingEntity',
    'nameBankingEntity',
    'descriptionBankingEntity',
    'addressBankingEntity',
    'cellphoneBankingEntity',
    'websiteBankingEntity',
    'headquarterBankingEntity',
    //'user',
    'edit',
    'delete','detalle'
  ];

  dataSource: MatTableDataSource<Bankingentity> = new MatTableDataSource();
  constructor(private bS: BankingentityService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.bS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
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
