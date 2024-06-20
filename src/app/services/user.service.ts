import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User} from '../models/user';
import { enviroment } from '../../enviroments/enviroment';
import { Subject } from 'rxjs';

//importar de enviroment.ts
const base_url=enviroment.base

@Injectable({
  providedIn: 'root'
})
  
export class UserService {
  
  private url = `${base_url}/usuarios` //ruta del controlador del backend
  private listaCambio = new Subject<User[]>();
  //inyecciòn
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<User[]>(this.url);
  }

  insert(u: User) {
    return this.http.post(this.url, u);
  }
  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }
  update(c: User) {
    return this.http.put(this.url, c);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}


