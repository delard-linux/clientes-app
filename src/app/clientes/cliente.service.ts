import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private urlEndPoint: string = 'http://localhost:8082/api/clientes';

constructor(private http: HttpClient) {}

getClientes(): Observable<Cliente[]> {
  return this.http.get(this.urlEndPoint).pipe(
        map(response => response as Cliente[])
      );
}

}
