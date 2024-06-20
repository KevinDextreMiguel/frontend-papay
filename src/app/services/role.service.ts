import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Role[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Role[]>(this.url);
  }

  insert(r:Role) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }
  update(c: Role) {
    return this.http.put(this.url, c);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
