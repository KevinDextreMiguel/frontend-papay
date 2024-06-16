import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-crearrole',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './crearrole.component.html',
  styleUrl: './crearrole.component.css'
})
export class CrearroleComponent{
  form: FormGroup = new FormGroup({});
  r: Role = new Role();
  listarNombres: User[] = [];


  nombre: { value: string; viewValue: string }[] = [
    { value: 'PENSIONISTA', viewValue: 'PENSIONISTA' },
    { value: 'ADMIN', viewValue: 'ADMIN' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RoleService,
    private router: Router,
     private uS: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameRole: ['', Validators.required],
      user: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listarNombres = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.r.nameRole = this.form.value.nameRole;
      this.r.user.idUser = this.form.value.user;
      this.rS.insert(this.r).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['listarrole']);
    }
  }
}
