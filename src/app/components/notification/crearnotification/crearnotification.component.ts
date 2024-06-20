import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Notification } from '../../../models/notification';
import { NotificationService } from '../../../services/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { Movement } from '../../../models/movement';
import { MovementService } from '../../../services/movement.service';

@Component({
  selector: 'app-crearnotification',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,MatIconModule,
    MatInputModule,NgIf,RouterLink,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './crearnotification.component.html',
  styleUrl: './crearnotification.component.css'
})
export class CrearnotificationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  n: Notification=new Notification();

  edicion:boolean=false;
  id:number=0;
  listarmovimen:Movement[]=[];

  estado: { value: string; viewValue: string }[] = [
    { value: 'Recibido', viewValue: 'Recibido' },
    { value: 'No recibido', viewValue: 'No recibido' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private nS: NotificationService,
    private router: Router,
    private nm:MovementService

  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      messageNotification: ['', Validators.required],
      stateNotification: ['', Validators.required],
      movement: ['',[Validators.required]],
    });
    this.nm.list().subscribe((data) => {
      this.listarmovimen = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.n.messageNotification = this.form.value.messageNotification;
      this.n.dateShipNotification = moment().add('days').toDate();
      this.n.stateNotification = this.form.value.stateNotification;
       this.n.movement.idMovement = this.form.value.movement;
      this.nS.insert(this.n).subscribe((data) => {
        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
        });
      });
      this.router.navigate(['listarnotification']);
    }
  }
}
