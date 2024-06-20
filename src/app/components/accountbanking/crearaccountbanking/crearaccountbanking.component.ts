import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Accountbanking } from '../../../models/accountbanking';
import moment from 'moment';
import { AccountbankingService } from '../../../services/accountbanking.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Bankingentity } from '../../../models/bankingentity';
import { BankingentityService } from '../../../services/bankingentity.service';

@Component({
  selector: 'app-crearaccountbanking',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    NgIf,
    RouterLink,
    MatSelectModule,
  ],
  templateUrl: './crearaccountbanking.component.html',
  styleUrl: './crearaccountbanking.component.css',
})
export class CrearaccountbankingComponent implements OnInit {
  listaEntidadBancaria: Bankingentity[] = [];
  form: FormGroup = new FormGroup({});
  a: Accountbanking = new Accountbanking();
  edicion: boolean = false;
  id: number = 0;

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Cuenta ahorro simple', viewValue: 'Cuenta ahorro simple' },
    { value: 'Cuenta digital', viewValue: 'Cuenta digital' },
    { value: 'Cuenta sueldo', viewValue: 'Cuenta sueldo' },
    { value: 'Cuenta senior', viewValue: 'Cuenta senior' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private aS: AccountbankingService,
    private router: Router,
    private bs: BankingentityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      typeAccountBanking: ['', Validators.required],
      amountAccountBanking: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), // Acepta números enteros o decimales con hasta 2 decimales
          //  Validators.min(0) // Asegura que el valor no sea negativo
        ],
      ],
      entityBank: ['', Validators.required],
      numberAccountBanking: ['', Validators.required],
      //[Validators.required, Validators.pattern(/^[0-9]{24}$/)]],
    });
    this.bs.list().subscribe((data) => {
      this.listaEntidadBancaria = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.a.numberAccountBanking = this.form.value.numberAccountBanking;
      this.a.typeAccountBanking = this.form.value.typeAccountBanking;
      this.a.amountAccountBanking = this.form.value.amountAccountBanking;
      this.a.dateOpening = moment().add('days').toDate();
      // this.a.dateOpening = new Date();
      this.a.entityBank.idBankingEntity = this.form.value.entityBank;
      this.a.numberAccountBanking = this.form.value.numberAccountBanking;
      this.aS.insert(this.a).subscribe((data) => {
        this.aS.list().subscribe((data) => {
          this.aS.setList(data);
        });
      });

      this.router.navigate(['listaraccountbanking']);
    }
  }
  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          numberAccountBanking: new FormControl(data.numberAccountBanking),
          typeAccountBanking: new FormControl(data.typeAccountBanking),
          amountAccountBanking: new FormControl(data.amountAccountBanking),
          dateOpening: new FormControl(data.dateOpening),
        });
      });
    }
  }
}
