import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { map, catchError, Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private urlEndPoint: string = 'http://localhost:8082/api/clientes';
private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

constructor(private http: HttpClient, 
  private router: Router) {}

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
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    .pipe(
      catchError( e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Oops...',e.error.mensaje,'error');
        return throwError(() => e);
      })
    );
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

