import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Services } from '../../../models/services';
import { ServicesService } from '../../../services/services.service';
import { MatDialog } from '@angular/material/dialog';
import { ElimanarservicesComponent } from './elimanarservices/elimanarservices.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listarservices',
  standalone: true,
  imports: [MatTableModule, ElimanarservicesComponent, MatButtonModule,
    MatFormFieldModule, RouterLink, MatPaginatorModule,
    MatInputModule, MatIconModule, CommonModule,
    MatProgressSpinnerModule,
    MatSortModule, DatePipe
  ],
  templateUrl: './listarservices.component.html',
  styleUrl: './listarservices.component.css'
})
export class ListarservicesComponent implements OnInit{
  displayedColumns: string[] =
    ['nameService', 
    'descriptionService',
     'dateService',
      'timeService', 
      'nombre','tiposervicio',
      'editar', 'delete'];
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  
  dataSource: MatTableDataSource<Services> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private sS: ServicesService,public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminarservicio(id: number): void {
    this.dialog.open(ElimanarservicesComponent, {width: '250px'}).afterClosed().subscribe((res) => {
      if(res){
        this.sS.eliminar(id).subscribe(()=> {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        })
      }
    });
  }
}
