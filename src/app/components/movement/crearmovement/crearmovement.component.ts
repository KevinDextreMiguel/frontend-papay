import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Movement } from '../../../models/movement';
import moment from 'moment';
import { MovementService } from '../../../services/movement.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Accountbanking } from '../../../models/accountbanking';
import { AccountbankingService } from '../../../services/accountbanking.service';

@Component({
  selector: 'app-crearmovement',
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
  templateUrl: './crearmovement.component.html',
  styleUrl: './crearmovement.component.css'
})
export class CrearmovementComponent implements OnInit{
  listaAccountBanking: Accountbanking[]=[];
  form: FormGroup = new FormGroup({});
  m: Movement = new Movement();
  edicion:boolean=false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private mS: MovementService,
    private router: Router,
    private ab:AccountbankingService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idMovement:[''],
      typeMovement: ['', [Validators.required, Validators.pattern(/^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/)]],
      amountMovement: ['',    [
        Validators.required,
        Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), // Acepta números enteros o decimales con hasta 2 decimales
        //  Validators.min(0) // Asegura que el valor no sea negativo
      ],
    ],
      numberAccountBanking: ['', Validators.required],
    });
    this.ab.list().subscribe((data) => {
      this.listaAccountBanking = data;
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.m.idMovement = this.form.value.idMovement;
      this.m.dateMovement = moment().add('days').toDate();
      this.m.typeMovement = this.form.value.typeMovement;
      this.m.amountMovement = this.form.value.amountMovement;
      this.m.numberAccountBanking = this.form.value.numberAccountBanking;
      this.mS.insert(this.m).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
      this.router.navigate(['listarmovement']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idMovement : new FormControl(data.idMovement),
          dateMovement: new FormControl(data.dateMovement),
          typeMovement: new FormControl(data.typeMovement),
          amountMovement: new FormControl(data.amountMovement),
          numberAccountBanking: new FormControl(data.numberAccountBanking),
        });
      });
    }
  }
}
