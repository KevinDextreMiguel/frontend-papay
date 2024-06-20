import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Subject } from 'rxjs';
import { Typeservice } from '../models/typeservice';
import { HttpClient } from '@angular/common/http';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class TypeserviceService {
  private url = `${base_url}/tiposervicios`;
  private listaCambio = new Subject<Typeservice[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Typeservice[]>(this.url);
  }

  insert(t: Typeservice) {
    return this.httpClient.post(this.url, t);
  }
  setList(listaNueva:Typeservice[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }


  listId(id: number) {
    return this.httpClient.get<Typeservice>(`${this.url}/${id}`);

  }
  update(ts: Typeservice) {
    return this.httpClient.put(this.url, ts);
  }


  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);

  }
}
