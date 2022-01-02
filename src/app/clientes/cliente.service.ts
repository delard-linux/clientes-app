import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private urlEndPoint: string = 'http://localhost:8082/api/clientes';
private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

constructor(private http: HttpClient) {}

getClientes(): Observable<Cliente[]> {
  return this.http.get(this.urlEndPoint).pipe(
        map(response => response as Cliente[])
      );
}

create(cliente: Cliente): Observable<Cliente> {
  return this.http.post<Cliente>(this.urlEndPoint, 
        cliente, 
        {headers:this.httpHeaders});
}

getCliente(id: number): Observable<Cliente> {
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
}

update(cliente: Cliente): Observable<Cliente> {
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, 
            cliente, 
            {headers:this.httpHeaders});
}

delete(cliente: Cliente): Observable<number> {
  return this.http.delete<number>(`${this.urlEndPoint}/${cliente.id}`, 
            {headers:this.httpHeaders});
}

}

