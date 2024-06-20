import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private url = `${base_url}/notificaciones`;
  private listaCambio = new Subject<Notification[]>();
  constructor(private http: HttpClient) { } 
  
  list() {
    return this.http.get<Notification[]>(this.url);
  }

  insert(n: Notification) {
    return this.http.post(this.url, n);
  }
  setList(listaNueva: Notification[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Notification>(`${this.url}/${id}`);
  }
  update(c: Notification) {
    return this.http.put(this.url, c);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
