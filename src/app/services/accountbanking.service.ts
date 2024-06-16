import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Accountbanking } from '../models/accountbanking';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class AccountbankingService {
  private url = `${base_url}/cuentas`;
  private listaCambio = new Subject<Accountbanking[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Accountbanking[]>(this.url);
  }

  insert(a: Accountbanking) {
    return this.http.post(this.url, a);
  }
  setList(listaNueva: Accountbanking[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Accountbanking>(`${this.url}/${id}`);
  }
  update(c: Accountbanking) {
    return this.http.put(this.url, c);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
