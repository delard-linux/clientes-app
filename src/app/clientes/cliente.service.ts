import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { map, catchError, Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe} from '@angular/common';

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
          map(response => {
              let clientes = response as Cliente[];
              return clientes.map( cliente => {
                cliente.nombre = cliente.nombre?.toUpperCase();
                // Formato de fecha opcion 1
                cliente.bornAt = cliente.bornAt?formatDate(cliente.bornAt,'dd-MM-yyyy','en-US'):cliente.bornAt;
                let datePipe = new DatePipe('en-US');
                // Formato de fecha opcion 2
                cliente.createAt = cliente.createAt?datePipe.transform(cliente.createAt,'dd/MM/yyyy HH')+'h':cliente.createAt;
                return cliente;
                }
              );
          })
        )
        .pipe(catchError( e => this.manageError(e)));
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post(this.urlEndPoint, 
          cliente, 
          {headers:this.httpHeaders})
          .pipe(
              map((response:any) => response.cliente as Cliente),
              catchError( e => {
                if(e.status==400){
                  return throwError(() => e);
                }
                return this.manageError(e);
              })
            );
  }

  getCliente(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/${id}`)
              .pipe(catchError( e => this.manageError(e)));
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, 
              cliente, 
              {headers:this.httpHeaders})
              .pipe(
                map((response:any) => response.cliente as Cliente),
                catchError( er => {
                  if(er.status==400){
                    return throwError(() => er);
                  }
                  return this.manageError(er);
                })
              );
  }

  delete(cliente: Cliente): Observable<any> {
    return this.http.delete<number>(`${this.urlEndPoint}/${cliente.id}`, 
              {headers:this.httpHeaders})
              .pipe(catchError( e => this.manageError(e)));
  }

  manageError(err: any): Observable<never>{
    this.router.navigate(['/clientes']);
    console.error(err.error.mensaje);
    Swal.fire(`Oops... ${err.error.mensaje}`,err.error.error,'error');
    return throwError(() => err);
  }

}

