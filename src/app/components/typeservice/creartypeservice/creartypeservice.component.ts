import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Typeservice } from '../../../models/typeservice';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { TypeserviceService } from '../../../services/typeservice.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creartypeservice',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './creartypeservice.component.html',
  styleUrl: './creartypeservice.component.css'
})
export class CreartypeserviceComponent {
  form: FormGroup = new FormGroup({});
  ts: Typeservice = new Typeservice();
  edicion: boolean = false;
  id: number = 0;
  tipos: { value: string; viewValue: string }[] = [
    { value: 'luz', viewValue: 'luz' },
    { value: 'agua', viewValue: 'agua' },
    { value: 'internet', viewValue: 'internet' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private tsS: TypeserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nameTypeService: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.ts.idTypeService = this.form.value.codigo;
      this.ts.nameTypeService = this.form.value.nameTypeService;
      this.tsS.insert(this.ts).subscribe((data) => {
        this.tsS.list().subscribe((data) => {
          this.tsS.setList(data);
        });
      });
      this.router.navigate(['listartypeservice']);
    }
  }

  init() {
    if (this.edicion) {
      this.tsS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.nameTypeService),
          nameTypeService: new FormControl(data.nameTypeService),
        });
      });
    }
  }
}
