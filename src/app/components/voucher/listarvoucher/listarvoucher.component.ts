import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Voucher } from '../../../models/voucher';
import { VoucherService } from '../../../services/voucher.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EliminarvoucherComponent } from './eliminarvoucher/eliminarvoucher.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listarvoucher',
  standalone: true,
  imports: [
    MatTableModule, CommonModule, MatButtonModule,
    MatFormFieldModule, RouterLink, MatPaginatorModule,
    MatInputModule, MatIconModule, EliminarvoucherComponent
  ],
  templateUrl: './listarvoucher.component.html',
  styleUrl: './listarvoucher.component.css'
})
  
  
export class ListarvoucherComponent {
  
  displayedColumns: string[] = ['dateVoucher', 'hourVoucher','destinationAccountVoucher','amountVoucher','numberOperationVoucher',
   // 'serviceB',
    'editar','delete'];
  dataSource: MatTableDataSource<Voucher> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private vS: VoucherService,public dialog: MatDialog) {}
  ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.vS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }
  
 eliminarvoucher(id: number): void {
      this.dialog.open(EliminarvoucherComponent, {width: '250px'}).afterClosed().subscribe((res) => {
        if(res){
          this.vS.eliminar(id).subscribe((data) => {
            this.vS.list().subscribe((data) => {
              this.vS.setList(data);
            });
          })
        }
      });
    }
  }

