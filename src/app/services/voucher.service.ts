import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Voucher } from '../models/voucher';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { VoucherByServiceDTO } from '../models/voucherByServiceDTO';

const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private url = `${base_url}/comprobantes`;
  private listaCambio = new Subject<Voucher[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Voucher[]>(this.url);
  }

  insert(v: Voucher) {
    return this.http.post(this.url, v);
  }
  setList(listaNueva:Voucher[] ) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Voucher>(`${this.url}/${id}`);
  }
  update(c: Voucher) {
    return this.http.put(this.url, c);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getmontoVoucherser():Observable<VoucherByServiceDTO[]>{
    return this.http.get<VoucherByServiceDTO[]>(`${this.url}/totalamountofvouchersByservice`)
  }
}
