import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/notification';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EliminarnotificationComponent } from './eliminarnotification/eliminarnotification.component';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-listarnotification',
  standalone: true,
  imports: [MatTableModule,EliminarnotificationComponent,MatButtonModule,MatFormFieldModule,RouterLink,MatPaginatorModule,MatInputModule,MatIconModule],
  templateUrl: './listarnotification.component.html',
  styleUrl: './listarnotification.component.css'
})
export class ListarnotificationComponent implements OnInit{
  displayedColumns: string[] = [
  'messageNotification',
  'dateShipNotification',
  'stateNotification','delete'
];
@ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Notification> = new MatTableDataSource();
  constructor(private nS: NotificationService,public dialog: MatDialog ) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.nS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminanotificacion(id: number): void {
    this.dialog.open(EliminarnotificationComponent, {width: '250px'}).afterClosed().subscribe((res) => {
      if(res){
        this.nS.eliminar(id).subscribe(()=> {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        })
      }
    });
  }
}
