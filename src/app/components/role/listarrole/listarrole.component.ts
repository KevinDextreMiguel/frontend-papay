import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/role';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleService } from '../../../services/role.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarrole',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
  
export class ListarroleComponent implements OnInit{
  displayedColumns: string[] = [
    'nameRole', 'usuario'
  ];

  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private rS: RoleService) { }
  
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
}
