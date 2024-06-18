import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { Services } from '../../../models/services';
import moment from 'moment';
import { ServicesService } from '../../../services/services.service';
import {
  ActivatedRoute, Params,
  Router, RouterLink
} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Typeservice } from '../../../models/typeservice';
import { TypeserviceService } from '../../../services/typeservice.service';


@Component({
  selector: 'app-crearservicio',
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule, NgIf,RouterLink,ReactiveFormsModule,MatButtonModule],
  templateUrl: './crearservicio.component.html',
  styleUrl: './crearservicio.component.css'
})
export class CrearservicioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  s: Services = new Services();
  maxFecha: Date = moment().add(-1, 'days').toDate();
  edicion: boolean=false;
  id:number=0;
  listarusuario:User[]=[];
  listartiposer:Typeservice[]=[];
  constructor(
    private sS: ServicesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private us:UserService,
    private tP:TypeserviceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idService:[''],
      nameService: ['', Validators.required],
      descriptionService: ['', Validators.required],
      dateService: ['', Validators.required],
      timeService: ['', Validators.required],
      idUser: ['', Validators.required],
      typeService: ['',Validators.required]
    });
    this.us.list().subscribe((data) => {
      this.listarusuario = data;
    });

    this.tP.list().subscribe((data) => {
      this.listartiposer = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      const time = this.form.value.timeService;
      console.log(this.form.value)
      this.s.idService = this.form.value.idService;
      this.s.nameService = this.form.value.nameService;
      this.s.descriptionService = this.form.value.descriptionService;
      this.s.dateService = this.form.value.dateService;
      const [hora , minuto] = time.split(":");
      let dateA:Date = new Date();
      dateA.setHours(hora, minuto);
      this.s.timeService = dateA;
      this.s.user.idUser = this.form.value.idUser;
      this.s.typeService.idTypeService=this.form.value.typeService,
      this.sS.insert(this.s).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });
      this.router.navigate(['listarservicio']);
    }
  }
  
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idService: new FormControl(data.idService),
          nameService: new FormControl(data.nameService),
          descriptionService: new FormControl(data.descriptionService),
          dateService: new FormControl(data.dateService),
          timeService: new FormControl(data.timeService),
          user: new FormControl(data.user),
          typeService:new FormControl(data.typeService)
        });
      });
    }
  }
}
