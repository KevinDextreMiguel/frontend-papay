import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Voucher } from '../../../models/voucher';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VoucherService } from '../../../services/voucher.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import moment from 'moment';
import { ServicesService } from '../../../services/services.service';
import { Services } from '../../../models/services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-crearvoucher',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,NgIf,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './crearvoucher.component.html',
  styleUrl: './crearvoucher.component.css'
})
export class CrearvoucherComponent {
  form: FormGroup = new FormGroup({});
  v: Voucher = new Voucher();
  maxFecha: Date = moment().add(-1, 'days').toDate();
 edicion:boolean=false;
 id:number=0;
 listarservicios:Services[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private vS: VoucherService,
    private router: Router,
    private route:ActivatedRoute,
    private sS:ServicesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idVoucher:[''],
    //  dateVoucher: ['', Validators.required],
      hourVoucher: ['', Validators.required],
      destinationAccountVoucher: ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      amountVoucher: ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      numberOperationVoucher: ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      serviceB: ['', Validators.required],
    });
    this.sS.list().subscribe((data) => {
      this.listarservicios = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      const time = this.form.value.hourVoucher;
      console.log(this.form.value)
      this.v.idVoucher = this.form.value.idVoucher;
      this.v.dateVoucher = moment().add('days').toDate();
      const [hora , minuto] = time.split(":");
      let dateA:Date = new Date()
      dateA.setHours(hora, minuto);
      this.v.hourVoucher = dateA;
      this.v.destinationAccountVoucher = this.form.value.destinationAccountVoucher;
      this.v.amountVoucher = this.form.value.amountVoucher;
      this.v.numberOperationVoucher = this.form.value.numberOperationVoucher;
      this.v.serviceB.idService = this.form.value.serviceB;
      this.vS.insert(this.v).subscribe((data) => {
        this.vS.list().subscribe((data) => {
          this.vS.setList(data);
        });
      });
      this.router.navigate(['listarvoucher']);
    }
  }
  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idVoucher: new FormControl(data.idVoucher),
          dateVoucher: new FormControl(data.dateVoucher),
          hourVoucher: new FormControl(data.hourVoucher),
          destinationAccountVoucher: new FormControl(data.destinationAccountVoucher),
          amountVoucher: new FormControl(data.amountVoucher),
          numberOperationVoucher: new FormControl(data.numberOperationVoucher),
          serviceB: new FormControl(data.serviceB),
        });
      });
    }
  }
}
