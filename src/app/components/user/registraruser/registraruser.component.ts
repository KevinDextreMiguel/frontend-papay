import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import moment from 'moment';


@Component({
  selector: 'app-registraruser',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,NgIf,RouterLink,MatSelectModule
  ],
  templateUrl:'./registraruser.component.html',
  styleUrl: './registraruser.component.css'
})
  
  
  
export class RegistraruserComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  u: User = new User();
  edicion:boolean=false;
  id: number = 0;
  ver:boolean=true
  ciudades: { value: string; viewValue: string }[] = [
    { value: 'Ica', viewValue: 'Ica' },
    { value: 'Lima', viewValue: 'Lima' },
    { value: 'Piura', viewValue: 'Piura' },
    { value: 'Pucallpa', viewValue: 'Pucallpa' },
    { value: 'Cusco', viewValue: 'Cusco' },
    { value: 'Ayacucho', viewValue: 'Ayacucho' },
    { value: 'Arequipa', viewValue: 'Arequipa' },
    { value: 'Cajamarca', viewValue: 'Cajamarca' },
  ];
  
  maxFecha: Date = moment().add(-1, 'days').toDate();

  constructor(
    private formBuilder: FormBuilder,
    private uS: UserService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idUser: [''],
      nameUser: ['', Validators.required],
      lastnameUser: ['', Validators.required],
      dateBirth: ['', Validators.required],
      cityUser: ['', Validators.required],
      cellphoneUser: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      gmailUser: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: ['', Validators.required],


    });
  }



  registrar(): void {
    if (this.form.valid) {
      this.u.idUser = this.form.value.idUser;
      this.u.nameUser = this.form.value.nameUser;
      this.u.lastnameUser = this.form.value.lastnameUser;
      this.u.dateBirth = this.form.value.dateBirth;
      this.u.cityUser = this.form.value.cityUser;
      this.u.cellphoneUser = this.form.value.cellphoneUser;
      this.u.gmailUser = this.form.value.gmailUser;
      this.u.password = this.form.value.password;
      this.u.enabled = true;

      this.uS.insert(this.u).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['listaruser']);
    }
  }

  init() {
    if (this.edicion) {
      this.ver=false
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUser: new FormControl(data.idUser),
          nameUser: new FormControl(data.nameUser),
          lastnameUser: new FormControl(data.lastnameUser),
          dateBirth: new FormControl(data.dateBirth),
          cityUser: new FormControl(data.cityUser),
          cellphoneUser: new FormControl(data.cellphoneUser),
          gmailUser: new FormControl(data.gmailUser),
          password: new FormControl(data.password),
        });
      });
    }
  }
}
