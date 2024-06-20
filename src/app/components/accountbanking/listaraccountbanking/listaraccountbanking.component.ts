import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AccountbankingService } from '../../../services/accountbanking.service';
import { Accountbanking } from '../../../models/accountbanking';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EleminaraccountbankingComponent } from './eleminaraccountbanking/eleminaraccountbanking.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-listaraccountbanking',
  standalone: true,
  imports: [MatTableModule,
    EleminaraccountbankingComponent,
    MatButtonModule,
    MatFormFieldModule,
     RouterLink,
   MatPaginatorModule,
   MatInputModule,
   MatIconModule],
  templateUrl: './listaraccountbanking.component.html',
  styleUrl: './listaraccountbanking.component.css'
})
export class ListaraccountbankingComponent implements OnInit{
  displayedColumns: string[] = [
    'numberAccountBanking',
    'dateOpening',
    'typeAccountBanking',
   'amountAccountBanking',
    'entityBank',
    'editar',
    'delete'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Accountbanking> = new MatTableDataSource();
  constructor(private aS: AccountbankingService ,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.aS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminaraccountbanking(id: number): void {
    this.dialog.open(EleminaraccountbankingComponent, {width: '250px'}).afterClosed().subscribe((res) => {
      if(res){
        this.aS.eliminar(id).subscribe(()=> {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        })
      }
    });
  }
}
