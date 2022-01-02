import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{

  cliente: Cliente = new Cliente();
  titulo: string = "Crear Cliente";
  errores: string[] | undefined;

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.cargarCliente();
  }

  create(): void {
    console.log(`Clicked! to create ${this.cliente.nombre}`);
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire('Cliente Nuevo',`Cliente ${json.cliente.nombre} ${json.cliente.apellido} creado con éxito!`,'success');
         }, 
         err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error de creacion desde el backend: ' + err.status);
          console.error(err.error.errors);           }
         );
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.clienteService.getCliente(id).subscribe(
            (json) => this.cliente = json.cliente);
        }

      });
      console.log(`cargar cliente ${this.cliente.nombre}`);
  }

  update(): void {
    console.log(`Clicked! to update ${this.cliente.nombre}`);
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire('Cliente Actualizado',`Cliente ${json.cliente.nombre} ${json.cliente.apellido} actualiado con éxito!`,'success');
         }, 
         err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error de actualizacion desde el backend: ' + err.status);
          console.error(err.error.errors);           }
         );
  }

}
