import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Typeservice } from '../../../models/typeservice';
import { TypeserviceService } from '../../../services/typeservice.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-listartypeservice',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,//
    MatFormFieldModule,//
    RouterLink,//
    MatPaginatorModule,//
    MatInputModule,
    MatIconModule//
  ],
  templateUrl: './listartypeservice.component.html',
  styleUrl: './listartypeservice.component.css'
})
  
export class ListartypeserviceComponent implements OnInit {
  displayedColumns: string[] = [
    'nameTypeService',
    'editar',
    'eliminar'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Typeservice> = new MatTableDataSource();
  constructor(private tsS: TypeserviceService) {}

  ngOnInit(): void {
    this.tsS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tsS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  eliminar(id: number) {
    this.tsS.eliminar(id).subscribe((data) => {
      this.tsS.list().subscribe((data) => {
        this.tsS.setList(data);
      });
    });
  }
}

